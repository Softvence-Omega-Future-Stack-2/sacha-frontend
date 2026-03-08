import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetConversationsQuery } from '../api/chat.api';
import { format } from 'date-fns';

export interface Chat {
    id: string | number;
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

    const chats: Chat[] = useMemo(() => {
        return apiConversations.map((conv: any) => {
            const lastMsg = conv.last_message;
            const lastMsgText = lastMsg ? (lastMsg.message || lastMsg.content || lastMsg.text || 'No messages yet') : 'No messages yet';

            return {
                id: conv.id,
                name: conv.other_user?.full_name || conv.other_user?.email || `Chat ${conv.id}`,
                avatar: conv.other_user?.dp_image || conv.other_user?.profile_picture || '👤',
                message: lastMsgText,
                time: lastMsg?.created_at ? format(new Date(lastMsg.created_at), 'hh:mm a') : '',
                online: false,
            };
        });
    }, [apiConversations]);

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
