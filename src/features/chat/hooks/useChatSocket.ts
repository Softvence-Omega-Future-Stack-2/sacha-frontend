import { useEffect, useState, useCallback, useRef } from "react";
import { connectSocket, getSocket } from "../services/socket";

interface ChatMessage {
    id: string;
    sender: string;
    message: string;
    timestamp: string;
    read?: boolean;
}

export const useChatSocket = (roomId: string, token: string) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [socketStatus, setSocketStatus] = useState<number>(WebSocket.CLOSED);
    const queueRef = useRef<string[]>([]);
    const reconnectRef = useRef<any>(null);

    // Connect to WebSocket
    const connect = useCallback(() => {
        if (!roomId || !token) return;
        const socket = connectSocket(roomId, token);
        setSocketStatus(socket.readyState);

        socket.onopen = () => {
            console.log("[ChatSocket] Connected to room:", roomId);
            setSocketStatus(WebSocket.OPEN);
            // Send queued messages
            while (queueRef.current.length > 0) {
                const msg = queueRef.current.shift();
                if (msg) socket.send(msg);
            }
        };

        socket.onmessage = (event: MessageEvent) => {
            try {
                const data: ChatMessage = JSON.parse(event.data);
                setMessages((prev) => [...prev, data]);
            } catch (err) {
                console.error("[ChatSocket] Error parsing message:", err);
            }
        };

        socket.onclose = (event) => {
            setSocketStatus(WebSocket.CLOSED);
            if (!event.wasClean) {
                console.warn("[ChatSocket] Connection lost, retrying in 3s...");
                reconnectRef.current = setTimeout(connect, 3000);
            }
        };

        socket.onerror = (err) => {
            console.error("[ChatSocket] Socket error:", err);
            setSocketStatus(WebSocket.CLOSED);
            socket.close();
        };

        return socket;
    }, [roomId, token]);

    useEffect(() => {
        const socket = connect();

        return () => {
            if (reconnectRef.current) clearTimeout(reconnectRef.current);
            socket?.close();
        };
    }, [connect]);

    // Send message
    const sendMessage = useCallback(
        (message: string, type: "text" | "typing" | "read" = "text") => {
            const socket = getSocket();
            const payload = JSON.stringify({ type, message });

            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(payload);
            } else {
                console.log("[ChatSocket] Socket not open, queuing message");
                queueRef.current.push(payload);
                if (!socket || socket.readyState === WebSocket.CLOSED) connect();
            }
        },
        [connect]
    );

    const getStatusString = () => {
        switch (socketStatus) {
            case WebSocket.CONNECTING:
                return "CONNECTING";
            case WebSocket.OPEN:
                return "OPEN";
            case WebSocket.CLOSING:
                return "CLOSING";
            case WebSocket.CLOSED:
                return "CLOSED";
            default:
                return "UNKNOWN";
        }
    };

    return {
        messages,
        sendMessage,
        isConnected: socketStatus === WebSocket.OPEN,
        socketStatus: getStatusString(),
    };
};