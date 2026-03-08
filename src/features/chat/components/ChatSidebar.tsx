import React from 'react';
import { Search, Loader2 } from 'lucide-react';
import type { Chat } from '../hooks/useChatConversations';

interface ChatSidebarProps {
    chats: Chat[];
    activeChatId: string | number | null;
    isLoading: boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onChatClick: (id: string | number) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
    chats,
    activeChatId,
    isLoading,
    searchQuery,
    setSearchQuery,
    onChatClick
}) => {
    return (
        <div className="w-full lg:w-96 lg:border-r border-gray-100 flex flex-col h-full bg-white">
            <div className="px-4 py-4 space-y-4">
                <h2 className="text-xl font-bold text-gray-900 px-1">Messages</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-xl text-sm border border-transparent focus:bg-white focus:border-blue-400 focus:outline-none transition-all outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {isLoading ? (
                    <div className="flex justify-center p-8">
                        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                    </div>
                ) : chats.length === 0 ? (
                    <div className="p-10 text-center">
                        <p className="text-sm text-gray-400">{searchQuery ? 'No results found' : 'No messages yet'}</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-50">
                        {chats.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => onChatClick(chat.id)}
                                className={`flex items-center px-4 py-4 cursor-pointer transition-all hover:bg-gray-50 border-l-4 ${String(chat.id) === String(activeChatId)
                                    ? 'bg-blue-50/50 border-blue-600'
                                    : 'border-transparent'
                                    }`}
                            >
                                <div className="relative flex-shrink-0">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl shadow-inner uppercase font-bold text-blue-600">
                                        {chat.avatar.length > 2 ? <img src={chat.avatar} alt="" className="w-full h-full rounded-full object-cover" /> : chat.avatar.substring(0, 1)}
                                    </div>
                                    {chat.online && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                                    )}
                                </div>

                                <div className="ml-3 flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <h3 className={`text-sm font-semibold truncate ${String(chat.id) === String(activeChatId) ? 'text-blue-900' : 'text-gray-900'}`}>
                                            {chat.name}
                                        </h3>
                                        <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap ml-2">
                                            {chat.time}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 truncate line-clamp-1">
                                        {chat.message}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatSidebar;
