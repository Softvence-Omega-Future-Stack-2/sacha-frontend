let nativeWs: WebSocket | null = null;
let currentRoomId: string | null = null;
let currentToken: string | null = null;
let messageQueue: any[] = [];
let eventHandlers: { [key: string]: Array<(...args: any[]) => void> } = {};
let connectionAttempt = 0;

export interface SocketStub {
    connected: boolean;
    on: (event: string, callback: (...args: any[]) => void) => void;
    emit: (event: string, ...args: any[]) => void;
    disconnect: () => void;
}

export const connectSocket = (roomId: string, token: string): SocketStub => {
    currentRoomId = roomId;
    currentToken = token;

    if (nativeWs && (nativeWs.readyState === WebSocket.OPEN || nativeWs.readyState === WebSocket.CONNECTING)) {
        return getSocket()!;
    }

    // Confirmed correct pattern: ws/chat/ROOM_ID/
    const url = `wss://helloapart.duckdns.org/ws/chat/${roomId}/?token=${token}`;
    console.log(`[ChatSocket] Connecting to: ${url.split('?')[0]}`);

    nativeWs = new WebSocket(url);

    nativeWs.onopen = () => {
        console.log(`[ChatSocket] Connected successfully`);
        connectionAttempt = 0; // Reset on success
        // Flush queue
        while (messageQueue.length > 0) {
            const msg = messageQueue.shift();
            nativeWs?.send(JSON.stringify(msg));
        }
        eventHandlers['connect']?.forEach(cb => cb());
    };

    nativeWs.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            console.log('[ChatSocket] Message received:', data);
            eventHandlers['receive_message']?.forEach(cb => cb(data));
        } catch (e) {
            console.error('[ChatSocket] Parse error:', e);
        }
    };

    nativeWs.onclose = (e) => {
        console.log(`[ChatSocket] Disconnected (${e.code}). Attempt: ${connectionAttempt + 1}`);
        eventHandlers['disconnect']?.forEach(cb => cb(e.reason));

        // Auto-reconnect with exponential backoff on failure
        if (e.code !== 1000 && currentRoomId && currentToken) {
            connectionAttempt++;
            const delay = Math.min(1000 * Math.pow(2, Math.min(connectionAttempt - 1, 5)), 10000);
            console.log(`[ChatSocket] Retrying in ${delay}ms...`);
            setTimeout(() => {
                if (currentRoomId && currentToken) connectSocket(currentRoomId, currentToken);
            }, delay);
        }
    };

    nativeWs.onerror = (err) => {
        console.error("[ChatSocket] WebSocket error:", err);
        eventHandlers['connect_error']?.forEach(cb => cb(err));
    };

    return getSocket()!;
};

export const getSocket = (): SocketStub | null => {
    return {
        get connected() { return nativeWs?.readyState === WebSocket.OPEN; },
        on: (event: string, callback: (...args: any[]) => void) => {
            if (!eventHandlers[event]) eventHandlers[event] = [];
            eventHandlers[event].push(callback);
        },
        emit: (_event: string, payload: any) => {
            if (nativeWs?.readyState === WebSocket.OPEN) {
                nativeWs.send(JSON.stringify(payload));
            } else {
                console.log('[ChatSocket] Socket not ready, queuing message');
                messageQueue.push(payload);
            }
        },
        disconnect: () => {
            if (nativeWs) {
                nativeWs.onclose = null;
                nativeWs.close();
                nativeWs = null;
            }
            eventHandlers = {};
            messageQueue = [];
            connectionAttempt = 0;
        }
    };
};

export const disconnectSocket = () => {
    const socket = getSocket();
    if (socket) socket.disconnect();
};
