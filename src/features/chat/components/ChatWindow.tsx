import React from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
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
    } = useChatMessages(activeChat?.id, activeChat?.name);

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
            <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-white z-10 shadow-sm">
                <div className="flex items-center gap-3">
                    <button
                        className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
                        onClick={onBack}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>

                    <div className="relative">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg uppercase font-bold text-blue-600 shadow-inner">
                            {activeChat.avatar.length > 2 ? <img src={activeChat.avatar} alt="" className="w-full h-full rounded-full object-cover" /> : activeChat.avatar.substring(0, 1)}
                        </div>
                        {activeChat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm" />}
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-white/50 backdrop-blur-sm rounded-full border border-gray-100 shadow-sm">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(socketStatus)} ${isConnected ? '' : 'animate-pulse'}`} />
                            <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                                {isConnected ? 'Connected' : getStatusText(socketStatus)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-6 bg-[#FAFBFF] custom-scrollbar flex flex-col gap-1">
                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600/30" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-center p-8">
                        <div>
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-xl">👋</span>
                            </div>
                            <p className="text-sm text-gray-400">No messages between you and {activeChat.name} yet.</p>
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
                <div ref={messagesEndRef} className="pt-2" />
            </div>

            {/* Input */}
            <ChatInput onSendMessage={handleSend} isSending={isSending} />
        </div>
    );
};

export default ChatWindow;
