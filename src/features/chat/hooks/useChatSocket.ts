import { useEffect, useCallback, useState } from 'react';
import { connectSocket, disconnectSocket, getSocket } from '../services/socket';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { chatApi, useGetMessagesQuery } from '../api/chat.api';
import { selectUser } from '../../../redux/featuresAPI/auth/auth.slice';
import type { Message } from '../types';

export const useChatSocket = (roomId: string | undefined) => {
    const [socketStatus, setSocketStatus] = useState<'CONNECTING' | 'OPEN' | 'CLOSED' | 'ERROR'>('CONNECTING');
    const dispatch = useAppDispatch();
    const token = useAppSelector((state: any) => state.auth.accessToken);
    const user = useAppSelector(selectUser);

    const { data: messages = [] } = useGetMessagesQuery(roomId!, {
        skip: !roomId,
    });

    const handleIncomingMessage = useCallback((message: Message) => {
        if (!roomId) return;

        // Update messages cache
        dispatch(
            chatApi.util.updateQueryData('getMessages', roomId, (draft) => {
                const messagesArray = Array.isArray(draft) ? draft : (draft as any).results || [];
                const exists = messagesArray.some((m: any) => m.id === message.id);
                if (!exists) {
                    if (Array.isArray(draft)) {
                        draft.push(message);
                    } else if ((draft as any).results) {
                        (draft as any).results.push(message);
                    }
                }
            })
        );

        // Update conversations list (sidebar)
        dispatch(
            chatApi.util.updateQueryData('getConversations', undefined, (draft) => {
                const convs = Array.isArray(draft) ? draft : (draft as any).results || [];
                const convIndex = convs.findIndex((c: any) => String(c.id) === String(roomId));
                if (convIndex !== -1) {
                    convs[convIndex].last_message = message;
                    // Move to top
                    const [updatedConv] = convs.splice(convIndex, 1);
                    convs.unshift(updatedConv);
                }
            })
        );
    }, [dispatch, roomId]);

    useEffect(() => {
        if (!roomId || !token) {
            setSocketStatus('CLOSED');
            return;
        }

        setSocketStatus('CONNECTING');
        const socket = connectSocket(roomId, token);

        socket.on("connect", () => {
            console.log("[ChatSocket] Connected");
            setSocketStatus('OPEN');
        });

        socket.on("receive_message", (msg: Message) => {
            console.log("[ChatSocket] Received:", msg);
            handleIncomingMessage(msg);
        });

        socket.on("disconnect", (reason: string) => {
            console.log("[ChatSocket] Disconnected:", reason);
            setSocketStatus('CLOSED');
        });

        socket.on("connect_error", (err: Error) => {
            console.error("[ChatSocket] Connection Error:", err);
            setSocketStatus('ERROR');
        });

        return () => {
            disconnectSocket();
        };
    }, [roomId, token, handleIncomingMessage]);

    const sendMessage = useCallback((content: string) => {
        const socket = getSocket();
        if (socket && roomId) {
            socket.emit("send_message", {
                type: 'chat_message',
                message: content,
                room_id: roomId
            });

            // Optimistic update
            const optimisticMsg: Message = {
                id: Date.now(), // temporary ID
                sender: String(user?.id || 'me'),
                message: content,
                created_at: new Date().toISOString(),
                room_id: roomId
            };

            dispatch(
                chatApi.util.updateQueryData('getMessages', roomId!, (draft) => {
                    if (Array.isArray(draft)) {
                        draft.push(optimisticMsg);
                    } else if ((draft as any).results) {
                        (draft as any).results.push(optimisticMsg);
                    }
                })
            );

            // Also update conversations list optimistically
            dispatch(
                chatApi.util.updateQueryData('getConversations', undefined, (draft) => {
                    const convs = Array.isArray(draft) ? draft : (draft as any).results || [];
                    const convIndex = convs.findIndex((c: any) => String(c.id) === String(roomId));
                    if (convIndex !== -1) {
                        convs[convIndex].last_message = optimisticMsg;
                        // Move to top
                        const [updatedConv] = convs.splice(convIndex, 1);
                        convs.unshift(updatedConv);
                    }
                })
            );
        } else {
            console.warn("[ChatSocket] Cannot send, socket not initialized");
        }
    }, [roomId, user?.id, dispatch]);

    return { messages, sendMessage, socketStatus };
};
