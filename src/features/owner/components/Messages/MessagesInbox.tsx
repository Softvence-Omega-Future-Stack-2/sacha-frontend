import React, { useState, useEffect, useRef } from 'react';
import { Search, Paperclip, Smile, X, Send, ArrowLeft, Loader2 } from 'lucide-react';
import Title from '../Title';
import {
    useGetConversationsQuery,
    useGetMessagesQuery,
    useSendMessageMutation
} from '../../../../redux/featuresAPI/chat/chat.api';
import { useAppSelector } from '../../../../redux/hooks';
import { selectUser } from '../../../../redux/featuresAPI/auth/auth.slice';
import { format } from 'date-fns';

interface Message {
    sender: string;
    text: string;
    time: string;
    file?: { name: string };
    id?: number;
}

interface Chat {
    id: string;
    name: string;
    avatar: string;
    message: string;
    time: string;
    unread?: number;
    online?: boolean;
    isAdmin?: boolean;
}

const mockEmojis = [
    '👍', '❤️', '😂', '🔥', '🙏', '💯', '😊', '😍', '😎', '🎉',
    '🤔', '😭', '🤯', '🍕', '☕', '🏥', '💊', '🦠', '🧪', '🧬'
];

const ChatItem: React.FC<{ chat: Chat; isActive: boolean; onClick: (chatId: string) => void }> = ({ chat, isActive, onClick }) => {
    return (
        <div
            className={`flex items-center lg:px-4 px-2 py-3 rounded-xl lg:rounded-none lg:border-b lg:border-gray-200 lg:last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors ${isActive ? 'bg-blue-50' : ''}`}
            onClick={() => onClick(chat.id)}
        >
            <div className="relative">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                    {chat.avatar}
                </div>
                {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                )}
            </div>

            <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {chat.name}
                        {chat.isAdmin && <span className="ml-1 text-xs text-blue-600">Admin</span>}
                    </h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-600 truncate">{chat.message}</p>
                    {chat.unread && (
                        <span className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {chat.unread}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

const EmojiPicker: React.FC<{ onSelect: (emoji: string) => void; onClose: () => void }> = ({ onSelect, onClose }) => {
    return (
        <div className="absolute bottom-16 left-0 bg-[#F8FBFF] border border-gray-200 rounded-lg shadow-xl p-3 w-64 z-10">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
                <h4 className="text-sm font-semibold">Select an Emoji</h4>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <X className="w-4 h-4" />
                </button>
            </div>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                {mockEmojis.map((emoji, index) => (
                    <span
                        key={index}
                        className="text-2xl cursor-pointer hover:bg-gray-100 rounded-md p-1 transition-colors"
                        onClick={() => onSelect(emoji)}
                    >
                        {emoji}
                    </span>
                ))}
            </div>
        </div>
    );
};

const ActiveChat: React.FC<{
    activeChat: Chat | undefined;
    onBack: () => void
}> = ({ activeChat, onBack }) => {
    const user = useAppSelector(selectUser);
    const [inputMessage, setInputMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [attachedFile, setAttachedFile] = useState<File | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data: apiMessages = [], isLoading } = useGetMessagesQuery(activeChat?.id || '', {
        skip: !activeChat?.id,
        pollingInterval: 3000,
    });

    const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

    const formattedMessages: Message[] = apiMessages.map((msg: any) => ({
        id: msg.id,
        sender: msg.sender === user?.id ? 'You' : activeChat?.name || 'User',
        text: msg.content,
        time: msg.timestamp ? format(new Date(msg.timestamp), 'hh:mm a') : '',
    }));

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [formattedMessages]);

    if (!activeChat) {
        return (
            <div className="flex-1 flex items-center justify-center rounded-2xl p-2 bg-white border border-gray-200">
                <p className="text-gray-500 whitespace-normal text-lg">Select a chat to start messaging.</p>
            </div>
        );
    }

    const handleSendMessage = async () => {
        if ((inputMessage.trim() || attachedFile) && activeChat) {
            try {
                await sendMessage({
                    room_id: activeChat.id,
                    content: inputMessage.trim(),
                }).unwrap();

                setInputMessage('');
                setAttachedFile(null);
                setShowEmojiPicker(false);
            } catch (err) {
                console.error('Failed to send message:', err);
            }
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAttachedFile(file);
        }
        // Reset input so same file can be selected again
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const removeAttachedFile = () => {
        setAttachedFile(null);
    };

    const handleEmojiSelect = (emoji: string) => {
        setInputMessage(prev => prev + emoji);
        inputRef.current?.focus();
    };

    return (
        <div className="flex-1 flex flex-col rounded-2xl lg:h-48 p-2 bg-[#F8FBFF] lg:border lg:border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                <div className="flex items-center">
                    <button
                        className="lg:hidden mr-3 text-gray-600 hover:text-gray-900"
                        onClick={onBack}
                        aria-label="Back to chat list"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>

                    <div className="relative">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                            {activeChat.avatar}
                        </div>
                        {activeChat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
                    </div>
                    <div className="ml-3">
                        <h2 className="text-sm font-semibold text-gray-900">{activeChat.name}</h2>
                        <p className="text-xs whitespace-normal text-gray-500">
                            {activeChat.online ? 'Online' : 'Last seen: 2 hours ago'} · Local time: Jan 30, 2023, 5:10 AM
                        </p>
                    </div>
                </div>
            </div>

            {/* Messages Container */}
            <div
                className="flex-1 overflow-y-auto px-5 py-2 bg-gray-50 max-h-96 lg:max-h-[600px] flex flex-col"
                style={{ overflowY: 'scroll' }}
            >
                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    </div>
                ) : formattedMessages.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-gray-500">No messages yet. Say hello!</p>
                    </div>
                ) : (
                    formattedMessages.map((msg, i) => (
                        <div
                            key={msg.id || i}
                            className={`mb-4 flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-56 px-4 py-2 rounded-2xl ${msg.sender === 'You'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-800 border border-gray-100 shadow-sm'
                                    }`}
                            >
                                <p className="text-sm font-medium">{msg.sender === 'You' ? 'You' : msg.sender}</p>
                                <p className="text-sm mt-1 break-words whitespace-pre-wrap">
                                    {msg.text}
                                </p>
                                {msg.file && (
                                    <div className="mt-2 p-2 bg-opacity-20 rounded flex items-center gap-2">
                                        <Paperclip className="w-4 h-4" />
                                        <span className="text-xs">{msg.file.name}</span>
                                    </div>
                                )}
                                <p className="text-xs mt-1 opacity-70 text-right">{msg.time}</p>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="rounded-full px-4 py-3 bg-white relative">
                {showEmojiPicker && (
                    <EmojiPicker
                        onSelect={handleEmojiSelect}
                        onClose={() => setShowEmojiPicker(false)}
                    />
                )}

                {/* Attached File Preview */}
                {attachedFile && (
                    <div className="mb-2 flex items-center justify-between bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-sm">
                        <div className="flex items-center gap-2">
                            <Paperclip className="w-4 h-4" />
                            <span className="truncate max-w-[200px]">{attachedFile.name}</span>
                        </div>
                        <button onClick={removeAttachedFile} className="hover:text-blue-900">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                <div className="w-full flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-sm min-h-12">
                    {/* Hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden"
                    />

                    <button
                        className="text-gray-500 hover:text-gray-700 flex-shrink-0"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Paperclip className="w-5 h-5" />
                    </button>

                    <button
                        className="text-gray-500 hover:text-gray-700 flex-shrink-0"
                        onClick={() => setShowEmojiPicker(prev => !prev)}
                    >
                        <Smile className={`w-5 h-5 ${showEmojiPicker ? 'text-blue-600' : ''}`} />
                    </button>

                    <textarea
                        ref={inputRef}
                        rows={1}
                        placeholder="Type a message..."
                        className="flex-1 w-[180px] md:w-[260px] lg:w-[340px] max-w-full resize-none overflow-y-auto bg-transparent text-sm focus:outline-none py-2 [field-sizing:content]"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            height: 'auto',
                            minHeight: '20px',
                            maxHeight: '128px'
                        }}
                        value={inputMessage}
                        onChange={(e) => {
                            setInputMessage(e.target.value);
                            e.target.style.height = 'auto';
                            e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`;
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    />

                    <button
                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                        onClick={handleSendMessage}
                        disabled={(!inputMessage.trim() && !attachedFile) || isSending}
                    >
                        {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function App() {
    const { data: apiConversations = [], isLoading: isLoadingConversations } = useGetConversationsQuery(undefined, {
        pollingInterval: 5000,
    });
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isChatOpenOnMobile, setIsChatOpenOnMobile] = useState(false);

    useEffect(() => {
        if (apiConversations.length > 0 && !activeChatId) {
            setActiveChatId(apiConversations[0].id);
        }
    }, [apiConversations, activeChatId]);

    const handleChatClick = (id: string) => {
        setActiveChatId(id);
        setIsChatOpenOnMobile(true);
    };

    const handleBackClick = () => {
        setIsChatOpenOnMobile(false);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const chats: Chat[] = apiConversations.map((conv: any) => ({
        id: conv.id,
        name: conv.other_participant?.username || conv.room_name || `Room ${conv.id}`,
        avatar: conv.other_participant?.avatar || '👤',
        message: conv.last_message?.content || 'No messages yet',
        time: conv.last_message?.timestamp ? format(new Date(conv.last_message.timestamp), 'hh:mm a') : '',
        online: false,
    }));

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeChat = chats.find(chat => chat.id === activeChatId);

    const sidebarClass = isChatOpenOnMobile ? 'hidden lg:flex' : 'flex';
    const activeChatClass = isChatOpenOnMobile ? 'flex' : 'hidden lg:flex';

    return (
        <>
            <Title title='Messages' paragraph='Manage your assets and applications in the blink of an eye' />

            <div className="flex flex-col lg:flex-row justify-between gap-2 lg:p-2 bg-white h-[calc(85vh-78px)]">
                {/* Sidebar */}
                <div className={`w-full lg:w-96 lg:border rounded-2xl lg:border-gray-200 flex-col ${sidebarClass}`}>
                    <div className="lg:px-4  py-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {isLoadingConversations ? (
                            <div className="flex justify-center p-8">
                                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                            </div>
                        ) : filteredChats.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                {searchQuery ? 'No conversations found' : 'No conversations yet'}
                            </div>
                        ) : (
                            filteredChats.map((chat) => (
                                <ChatItem
                                    key={chat.id}
                                    chat={chat}
                                    isActive={chat.id === activeChatId}
                                    onClick={handleChatClick}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* Active Chat */}
                <div className={`w-full ${activeChatClass} flex-col`}>
                    <ActiveChat
                        activeChat={activeChat}
                        onBack={handleBackClick}
                    />
                </div>
            </div>
        </>
    );
}
