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

export interface SocketMessage {
    type: 'chat_message';
    message: string;
    sender: string; // Email as documented
    timestamp: string;
    message_id: number;
}

export interface Conversation {
    id: number;
    other_user: {
        id: number;
        email: string;
        profile_picture: string | null;
        full_name: string;
    };
    last_message: {
        text: string;
        timestamp: string;
        sender: string;
    } | null;
    created_at: string;
}
