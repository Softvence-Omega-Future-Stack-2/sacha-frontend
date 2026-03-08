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

    const { messages: rawMessages, sendMessage, socketStatus } = useChatSocket(activeChatId?.toString());

    const messagesArray = Array.isArray(rawMessages) ? rawMessages : (rawMessages as any).results || (rawMessages as any).data || [];

    const formattedMessages: FormattedMessage[] = messagesArray.map((msg: Message) => {
        const senderVal = msg.sender_id || msg.sender;
        const isMine = String(senderVal) === String(user?.id) || String(senderVal) === String(user?.email);
        const text = msg.message || msg.content || msg.text || '';

        let formattedTime = '';
        try {
            const dateStr = msg.created_at || msg.timestamp;
            if (dateStr) {
                formattedTime = format(new Date(dateStr), 'hh:mm a');
            } else {
                formattedTime = format(new Date(), 'hh:mm a');
            }
        } catch (e) {
            formattedTime = format(new Date(), 'hh:mm a');
        }

        return {
            id: Number(msg.message_id || msg.id) || Date.now(),
            sender: isMine ? 'You' : chatPartnerName || 'User',
            text: text,
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
        isLoading: false, // Handled within hook or by data availability
        isSending: false,
        handleSend,
        messagesEndRef,
        scrollToBottom,
        socketStatus,
    };
};
