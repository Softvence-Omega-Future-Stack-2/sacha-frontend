import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetConversationsQuery } from '../api/chat.api';
import { useAppSelector } from '../../../redux/hooks';
import { format } from 'date-fns';

export interface Chat {
    id: string | number;
    recipientId: number;
    name: string;
    avatar: string;
    message: string;
    time: string;
    unread?: number;
    online?: boolean;
    isAdmin?: boolean;
}

export const useChatConversations = () => {
    const location = useLocation();
    const passedConversationId = location.state?.conversationId;

    const { data: apiConversations = [], isLoading: isLoadingConversations } = useGetConversationsQuery(undefined, {
        pollingInterval: 10000,
    });

    const [activeChatId, setActiveChatId] = useState<string | number | null>(passedConversationId || null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isChatOpenOnMobile, setIsChatOpenOnMobile] = useState(!!passedConversationId);

    useEffect(() => {
        if (apiConversations.length > 0 && !activeChatId) {
            setActiveChatId(apiConversations[0].id);
        }
    }, [apiConversations, activeChatId]);

    const user = useAppSelector((state: any) => state.auth.user);

    const chats: Chat[] = useMemo(() => {
        const mappedChats = apiConversations.map((conv: any) => {
            const lastMsg = conv.last_message;
            let lastMsgText = lastMsg?.text || 'No messages yet';

            const isMine = typeof lastMsg?.sender === 'string'
                ? lastMsg?.sender === user?.email
                : lastMsg?.sender === user?.id;

            if (lastMsg && isMine) {
                lastMsgText = `You: ${lastMsgText}`;
            }

            return {
                id: conv.id,
                recipientId: conv.other_user?.id,
                name: conv.other_user?.full_name || conv.other_user?.email || `Chat ${conv.id}`,
                avatar: conv.other_user?.profile_picture || conv.other_user?.dp_image || '👤',
                message: lastMsgText,
                time: lastMsg?.timestamp ? format(new Date(lastMsg.timestamp), 'hh:mm a') : '',
                online: false,
                rawTime: lastMsg?.timestamp,
            };
        });

        // Sort by recency (newest first)
        return [...mappedChats].sort((a, b) => {
            if (!a.rawTime) return 1;
            if (!b.rawTime) return -1;
            return new Date(b.rawTime).getTime() - new Date(a.rawTime).getTime();
        });
    }, [apiConversations, user]);

    const filteredChats = useMemo(() => {
        return chats.filter(chat =>
            chat.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [chats, searchQuery]);

    const activeChat = useMemo(() => {
        return chats.find(chat => String(chat.id) === String(activeChatId));
    }, [chats, activeChatId]);

    const handleChatClick = (id: string | number) => {
        setActiveChatId(id);
        setIsChatOpenOnMobile(true);
    };

    const handleBackClick = () => {
        setIsChatOpenOnMobile(false);
    };

    return {
        chats: filteredChats,
        activeChat,
        activeChatId,
        isLoading: isLoadingConversations,
        searchQuery,
        setSearchQuery,
        isChatOpenOnMobile,
        handleChatClick,
        handleBackClick,
    };
};
