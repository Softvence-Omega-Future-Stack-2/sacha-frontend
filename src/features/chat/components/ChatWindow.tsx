import React from 'react';
import { ArrowLeft } from 'lucide-react';
import type { Chat } from '../hooks/useChatConversations';
import { useChatMessages } from '../hooks/useChatMessages';
import ChatMessageItem from './ChatMessageItem';
import ChatInput from './ChatInput';

interface ChatWindowProps {
    activeChat: Chat | undefined;
    onBack: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ activeChat, onBack }) => {
    const {
        messages,
        isLoading,
        isSending,
        handleSend,
        messagesEndRef,
        socketStatus,
        isConnected
    } = useChatMessages(activeChat?.id, activeChat?.recipientId, activeChat?.name);

    if (!activeChat) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50/50 p-8 text-center animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Select a conversation</h3>
                <p className="text-sm text-gray-500 max-w-xs">Pick a chat from the sidebar to view your messages and start a discussion.</p>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'OPEN': return 'bg-green-500';
            case 'CONNECTING': return 'bg-yellow-500';
            case 'ERROR': return 'bg-red-500';
            default: return 'bg-gray-400';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'OPEN': return activeChat.online ? 'Online now' : 'Connected';
            case 'CONNECTING': return 'Connecting...';
            case 'ERROR': return 'Connection Error';
            case 'CLOSED': return 'Disconnected';
            default: return 'Offline';
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-white animate-in slide-in-from-right-2 duration-300">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20 shadow-sm">
                <div className="flex items-center gap-4">
                    <button
                        className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
                        onClick={onBack}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>

                    <div className="relative group">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-xl uppercase font-bold text-white shadow-lg ring-4 ring-blue-50 transition-transform group-hover:scale-105 duration-300 overflow-hidden">
                            {activeChat.avatar.length > 2 ? <img src={activeChat.avatar} alt="" className="w-full h-full object-cover" /> : activeChat.name.substring(0, 1)}
                        </div>
                        {activeChat.online && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md animate-pulse" />}
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-gray-900 leading-none mb-1.5">{activeChat.name}</h2>
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(socketStatus)} ${isConnected ? '' : 'animate-pulse'}`} />
                            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                {isConnected ? 'Active Now' : getStatusText(socketStatus)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-8 bg-[#F8FAFF] custom-scrollbar flex flex-col gap-2">
                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="space-y-4 w-full max-w-sm">
                            <div className="h-10 bg-gray-100 rounded-2xl w-2/3 animate-pulse" />
                            <div className="h-10 bg-blue-100 rounded-2xl w-1/2 ml-auto animate-pulse" />
                            <div className="h-10 bg-gray-100 rounded-2xl w-3/4 animate-pulse" />
                        </div>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-center p-12 animate-in fade-in zoom-in-95 duration-700">
                        <div className="max-w-xs">
                            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-12 transition-transform hover:rotate-0 duration-500">
                                <span className="text-4xl">💬</span>
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Say Hello!</h4>
                            <p className="text-sm text-gray-500">Start your conversation with {activeChat.name}. It's the beginning of something great!</p>
                        </div>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <ChatMessageItem
                            key={msg.id}
                            id={msg.id}
                            sender={msg.sender}
                            text={msg.text}
                            time={msg.time}
                            isMine={msg.isMine}
                        />
                    ))
                )}
                <div ref={messagesEndRef} className="pt-4" />
            </div>

            {/* Input Wrapper with Glassmorphism */}
            <div className="bg-white/80 backdrop-blur-md border-t border-gray-100 p-2">
                <ChatInput onSendMessage={handleSend} isSending={isSending} />
            </div>
        </div>
    );
};

export default ChatWindow;
