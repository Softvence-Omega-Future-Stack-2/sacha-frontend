import { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { selectUser } from '../../../redux/featuresAPI/auth/auth.slice';
import { format } from 'date-fns';
import { useChatSocket } from './useChatSocket';
import { useGetMessagesQuery } from '../api/chat.api';

export interface FormattedMessage {
    id: number | string;
    sender: string;
    text: string;
    time: string;
    isMine: boolean;
}

export const useChatMessages = (activeChatId: string | number | undefined, chatPartnerName?: string) => {
    const user = useAppSelector(selectUser);
    const token = useAppSelector((state: any) => state.auth.accessToken);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fetch initial messages
    const { data: initialMessages, isLoading } = useGetMessagesQuery(activeChatId?.toString() || '', {
        skip: !activeChatId,
    });

    // Use WebSocket for real-time messages
    const { messages: socketMessages, sendMessage, isConnected, socketStatus } = useChatSocket(
        activeChatId?.toString() || '',
        token || ''
    );

    const [allMessages, setAllMessages] = useState<any[]>([]);
    const [isSending, setIsSending] = useState(false);

    // Merge initial messages
    useEffect(() => {
        if (initialMessages && initialMessages.length > 0) {
            setAllMessages(initialMessages);
        }
    }, [initialMessages]);

    // Merge socket messages
    useEffect(() => {
        if (socketMessages && socketMessages.length > 0) {
            const lastSocketMsg = socketMessages[socketMessages.length - 1];
            setAllMessages((prev) => {
                // Check if message already exists by ID or content/timestamp
                const exists = prev.some(m =>
                    (m.id && lastSocketMsg.id && m.id === lastSocketMsg.id) ||
                    ((m.text || m.message) === ((lastSocketMsg as any).message || (lastSocketMsg as any).text) && Math.abs(new Date(m.timestamp).getTime() - new Date(lastSocketMsg.timestamp || Date.now()).getTime()) < 5000)
                );

                if (!exists) {
                    return [...prev, {
                        ...lastSocketMsg,
                        text: (lastSocketMsg as any).message || (lastSocketMsg as any).text,
                        timestamp: (lastSocketMsg as any).timestamp || new Date().toISOString(),
                    }];
                }
                return prev;
            });
        }
    }, [socketMessages]);

    const formattedMessages: FormattedMessage[] = useMemo(() => {
        return allMessages.map((msg: any) => {
            const isMine = msg.sender === user?.id;
            const senderName = isMine ? 'You' : (msg.sender_info?.full_name || msg.sender_info?.email || chatPartnerName || 'User');

            let formattedTime = '';
            try {
                const date = msg.timestamp ? new Date(msg.timestamp) : new Date();
                formattedTime = format(date, 'hh:mm a');
            } catch (e) {
                formattedTime = format(new Date(), 'hh:mm a');
            }

            return {
                id: msg.id || `${msg.timestamp}-${msg.text?.substring(0, 10)}`,
                sender: senderName,
                text: msg.text || msg.message,
                time: formattedTime,
                isMine,
            };
        });
    }, [allMessages, user?.id, chatPartnerName]);

    const scrollToBottom = useCallback((behavior: ScrollBehavior = 'auto') => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior });
        }
    }, []);

    useEffect(() => {
        if (formattedMessages.length > 0) {
            scrollToBottom();
        }
    }, [formattedMessages.length, scrollToBottom]);

    const handleSend = useCallback(async (content: string) => {
        if (!content.trim() || !activeChatId) return;
        setIsSending(true);
        try {
            sendMessage(content.trim());
        } catch (err) {
            console.error('Failed to send message:', err);
            throw err;
        } finally {
            setIsSending(false);
        }
    }, [activeChatId, sendMessage]);

    return {
        messages: formattedMessages,
        isLoading,
        isSending,
        handleSend,
        messagesEndRef,
        scrollToBottom,
        isConnected,
        socketStatus,
    };
};
