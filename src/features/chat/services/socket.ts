// services/socket.ts
let socket: WebSocket | null = null;

export const connectSocket = (roomId: string, token: string) => {
    const host = "helloapart.duckdns.org";
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const url = `${protocol}://${host}/ws/chat/${roomId}/?token=${token}`;

    // Reuse socket if already connected to same room
    if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
        if (socket.url.includes(`/ws/chat/${roomId}/`)) return socket;
        socket.close();
    }

    console.log(`[ChatSocket] Connecting to: ${url}`);
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