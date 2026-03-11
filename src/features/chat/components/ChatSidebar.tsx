import React from 'react';
import { Search } from 'lucide-react';
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
        <div className="w-full lg:w-96 lg:border-r border-gray-100 flex flex-col h-full bg-white shadow-inner">
            <div className="px-6 py-6 space-y-4 bg-white/80 backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Messages</h2>
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>

                    </div>
                </div>
                <div className="relative group">
                    <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 w-4 h-4 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full pl-11 pr-4 py-3 bg-gray-50/50 rounded-2xl text-sm border-2 border-transparent focus:bg-white focus:border-blue-400/50 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2 pb-4 custom-scrollbar">
                {isLoading ? (
                    <div className="flex justify-center p-12">
                        <div className="relative">
                            <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                    </div>
                ) : chats.length === 0 ? (
                    <div className="p-12 text-center animate-in fade-in zoom-in-95 duration-500">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-6 h-6 text-gray-300" />
                        </div>
                        <p className="text-sm font-medium text-gray-400">
                            {searchQuery ? 'No results found' : 'Start a new conversation'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {chats.map((chat, index) => {
                            const isActive = String(chat.id) === String(activeChatId);
                            return (
                                <div
                                    key={chat.id}
                                    onClick={() => onChatClick(chat.id)}
                                    className={`group flex items-center px-4 py-4 cursor-pointer rounded-2xl transition-all duration-300 mx-2 animate-in slide-in-from-left-4 fade-in ${isActive ? 'bg-blue-100' : ''}`}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className={`absolute left-0 w-1.5 h-10 bg-blue-600 rounded-r-full transition-all duration-300 transform scale-y-0 origin-center ${isActive ? 'scale-y-100' : 'group-hover:scale-y-50'}`} />

                                    <div className={`relative flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-lg ring-2 ring-transparent transition-all overflow-hidden ${isActive ? 'ring-blue-100 bg-blue-600 text-white' : 'bg-white group-hover:bg-blue-50 text-blue-600 ring-gray-100 group-hover:ring-blue-100'}`}>
                                            {chat.avatar.length > 2 ? (
                                                <img src={chat.avatar} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="font-bold">{chat.name.substring(0, 1).toUpperCase()}</span>
                                            )}
                                        </div>
                                        {chat.online && (
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2  border-black shadow-md animate-pulse" />
                                        )}

                                    </div>

                                    <div className={`ml-4 flex-1 min-w-0 transition-all ${isActive ? 'translate-x-1' : ''}`}>
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className={`text-sm font-bold truncate transition-colors ${isActive ? 'text-gray-900' : 'text-gray-700 group-hover:text-blue-600'}`}>
                                                {chat.name}
                                            </h3>
                                            <span className={`text-[10px] font-bold whitespace-nowrap ml-2 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                                                {chat.time}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className={`text-xs truncate line-clamp-1 transition-colors ${isActive ? 'text-gray-600 font-medium' : 'text-gray-500 underline-offset-4 group-hover:text-gray-700'}`}>
                                                {chat.message}
                                            </p>
                                            {chat.unread ? (
                                                <div className="ml-2 w-5 h-5 bg-blue-600 text-[10px] font-bold text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
                                                    {chat.unread}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className={`ml-2 transform transition-all duration-300 ${isActive ? 'translate-x-0 opacity-100 scale-100 bg' : 'translate-x-4 opacity-0 scale-50 group-hover:translate-x-0 group-hover:opacity-100 group-hover:scale-100'}`}>
                                        <div className="w-2 h-2 rounded-full bg-blue-600 shadow-sm" />

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatSidebar;
