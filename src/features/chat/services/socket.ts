// services/socket.ts
let socket: WebSocket | null = null;

export const connectSocket = (roomId: string, token: string) => {
    if (!roomId || !token) {
        console.warn("[ChatSocket] Missing roomId or token, skipping connection");
        return null;
    }

    const host = "helloapart.duckdns.org";
 
    const protocol = host.includes("localhost") ? "ws" : "wss";
    const url = `${protocol}://${host}/ws/chat/${roomId}/?token=${token}`;

    // Reuse socket if already connected to same room
    if (socket) {
        if (socket.url.includes(`/ws/chat/${roomId}/`) && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
            return socket;
        }
        console.log("[ChatSocket] Closing existing socket for different room or state");
        socket.close();
    }

    console.log(`[ChatSocket] Connecting to: ${protocol}://${host}/ws/chat/${roomId}/?token=***`);
    socket = new WebSocket(url);

    socket.onopen = () => console.log("[ChatSocket] Connected");
    socket.onclose = (event) =>
        console.log(
            `[ChatSocket] Disconnected (code: ${event.code}, clean: ${event.wasClean})`
        );
    socket.onerror = (err) => console.error("[ChatSocket] Error", err);

    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    socket?.close();
    socket = null;
};