import { useRef, useEffect, useCallback } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { selectUser } from '../../../redux/featuresAPI/auth/auth.slice';
import { format } from 'date-fns';
import { useChatSocket } from './useChatSocket';
import type { Message } from '../types';

export interface FormattedMessage {
    id: number;
    sender: string;
    text: string;
    time: string;
    isMine: boolean;
}

export const useChatMessages = (activeChatId: string | number | undefined, chatPartnerName?: string) => {
    const user = useAppSelector(selectUser);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { messages: rawMessages, sendMessage, socketStatus, isConnected } = useChatSocket(activeChatId?.toString());

    const messagesArray = Array.isArray(rawMessages) ? rawMessages : [];

    const formattedMessages: FormattedMessage[] = messagesArray.map((msg: Message) => {
        const isMine = msg.sender === user?.id;
        const senderName = isMine ? 'You' : (msg.sender_info?.full_name || msg.sender_info?.email || chatPartnerName || 'User');
        
        let formattedTime = '';
        try {
            formattedTime = format(new Date(msg.timestamp), 'hh:mm a');
        } catch (e) {
            formattedTime = format(new Date(), 'hh:mm a');
        }

        return {
            id: msg.id,
            sender: senderName,
            text: msg.text,
            time: formattedTime,
            isMine,
        };
    });

    const scrollToBottom = useCallback((behavior: ScrollBehavior = 'auto') => {
        messagesEndRef.current?.scrollIntoView({ behavior });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [formattedMessages.length, scrollToBottom]);

    const handleSend = async (content: string) => {
        if (!content.trim() || !activeChatId) return;
        try {
            sendMessage(content.trim());
        } catch (err) {
            console.error('Failed to send message:', err);
            throw err;
        }
    };

    return {
        messages: formattedMessages,
        isLoading: false,
        isSending: false,
        handleSend,
        messagesEndRef,
        scrollToBottom,
        socketStatus,
        isConnected,
    };
};
