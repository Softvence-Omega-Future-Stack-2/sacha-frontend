export interface Message {
    id: number | string;
    message_id?: number | string;
    message?: string;
    content?: string;
    text?: string;
    sender?: number | string;
    sender_id?: number | string;
    created_at?: string;
    timestamp?: string;
    room_id?: string | number;
}

export interface Conversation {
    id: string | number;
    last_message?: Message | null;
    created_at: string;
    other_user?: {
        id: number;
        email: string;
        profile_picture?: string | null;
        dp_image?: string | null;
        full_name?: string | null;
    };
}

export interface SocketMessage {
    type: 'chat_message';
    message: string;
    sender_id: number;
    room_id: string;
    created_at: string;
    id?: number;
}
