import { useEffect, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { chatApi, useGetMessagesQuery } from '../api/chat.api';
import { selectUser } from '../../../redux/featuresAPI/auth/auth.slice';
import type { Message } from '../types';

export const useChatSocket = (roomId: string | undefined, tokenParam?: string, otherUserId?: number | string) => {
    const [socketStatus, setSocketStatus] = useState<'CONNECTING' | 'OPEN' | 'CLOSED' | 'ERROR'>('OPEN');
    const dispatch = useAppDispatch();
    const reduxToken = useAppSelector((state: any) => state.auth.accessToken);
    const token = tokenParam || reduxToken;
    const user = useAppSelector(selectUser);

    useEffect(() => {
        if (otherUserId) {
            console.log(`[ChatSocket] Chatting with user: ${otherUserId}`);
        }
    }, [otherUserId]);

    const { data: messages = [] } = useGetMessagesQuery(roomId!, {
        skip: !roomId,
        pollingInterval: 3000, // Poll every 3 seconds for new messages
    });

    const handleIncomingMessage = useCallback((message: Message) => {
        if (!roomId) return;

        console.log('[ChatSocket] Processing incoming message:', message);

        dispatch(
            chatApi.util.updateQueryData('getMessages', roomId, (draft) => {
                const exists = draft.some((m: Message) => m.id === message.id);
                if (!exists) {
                    draft.push(message);
                }
            })
        );

        dispatch(
            chatApi.util.updateQueryData('getConversations', undefined, (draft) => {
                const convIndex = draft.findIndex((c: any) => String(c.id) === String(roomId));
                if (convIndex !== -1) {
                    draft[convIndex].last_message = message;
                    const [updatedConv] = draft.splice(convIndex, 1);
                    draft.unshift(updatedConv);
                }
            })
        );
    }, [dispatch, roomId]);

    useEffect(() => {
        if (!roomId || !token) {
            setSocketStatus('CLOSED');
            return;
        }

        // Skip WebSocket connection for now, just use HTTP polling
        setSocketStatus('OPEN');

        // Simulate connection for UI
        const timer = setTimeout(() => {
            console.log("[ChatSocket] HTTP polling mode active");
        }, 100);

        return () => {
            clearTimeout(timer);
        };
    }, [roomId, token, handleIncomingMessage]);

    const sendMessage = useCallback(async (content: string) => {
        if (!roomId || !user) {
            console.warn("[ChatSocket] Cannot send message: missing roomId or user");
            return;
        }

        // Create optimistic message for immediate UI update
        const optimisticMsg: Message = {
            id: Date.now(),
            conversation: Number(roomId),
            sender: user.id,
            sender_info: {
                id: user.id,
                email: user.email,
                profile_picture: null,
                full_name: `${user.first_name} ${user.last_name}`.trim() || user.email,
            },
            text: content,
            timestamp: new Date().toISOString(),
            is_read: false,
        };

        // Add to UI immediately
        dispatch(
            chatApi.util.updateQueryData('getMessages', roomId, (draft) => {
                draft.push(optimisticMsg);
            })
        );

        // Note: No actual API call since only GET endpoints are available
        console.log('[ChatSocket] Message added locally (no send API available):', content);
    }, [roomId, user, dispatch]);

    return { messages, sendMessage, socketStatus, isConnected: socketStatus === 'OPEN' };
};
