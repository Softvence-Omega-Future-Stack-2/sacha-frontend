import { useEffect, useState, useCallback, useRef } from "react";
import { connectSocket, getSocket } from "../services/socket";

import type { SocketMessage } from "../types";

export const useChatSocket = (roomId: string, token: string) => {
    const [messages, setMessages] = useState<SocketMessage[]>([]);
    const [socketStatus, setSocketStatus] = useState<number>(WebSocket.CLOSED);
    const queueRef = useRef<string[]>([]);
    const reconnectRef = useRef<any>(null);

    // Connect to WebSocket
    const connect = useCallback(() => {
        if (!roomId || !token) return null;
        const socket = connectSocket(roomId, token);
        if (!socket) return null;

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
                const data: SocketMessage = JSON.parse(event.data);
                if (data.type === 'chat_message') {
                    setMessages((prev: any) => [...prev, data]);
                }
            } catch (err) {
                console.error("[ChatSocket] Error parsing message:", err);
            }
        };

        socket.onclose = (event) => {
            if (socket.url.includes(`/ws/chat/${roomId}/`)) {
                setSocketStatus(WebSocket.CLOSED);
            }
            if (!event.wasClean) {
                console.warn("[ChatSocket] Connection lost, retrying in 3s...");
                reconnectRef.current = setTimeout(connect, 3000);
            }
        };

        socket.onerror = (err: any) => {
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
        (message: string, toUserId: number) => {
            const socket = getSocket();
            const payload = JSON.stringify({ message, to_user_id: toUserId });

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