export interface Message {
    id: number;
    conversation: number;
    sender: number;
    sender_info: {
        id: number;
        email: string;
        profile_picture?: string | null;
        full_name?: string | null;
    };
    text: string;
    timestamp: string;
    is_read: boolean;
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
    message: string;
}
