import React from 'react';
import ChatSidebar from '../../features/chat/components/ChatSidebar';
import ChatWindow from '../../features/chat/components/ChatWindow';
import { useChatConversations } from '../../features/chat/hooks/useChatConversations';

const Chat: React.FC = () => {
    const {
        chats,
        activeChat,
        activeChatId,
        isLoading,
        searchQuery,
        setSearchQuery,
        isChatOpenOnMobile,
        handleChatClick,
        handleBackClick,
    } = useChatConversations();

    const sidebarClass = isChatOpenOnMobile ? 'hidden lg:flex' : 'flex';
    const activeChatClass = isChatOpenOnMobile ? 'flex' : 'hidden lg:flex';

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
                    <p className="text-gray-600 mt-2">Communicate with property owners and tenants</p>
                </div>

                <div className="flex h-[calc(100vh-200px)] overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-lg">
                    <div className={`w-full lg:w-96 ${sidebarClass} flex-col border-r border-gray-200`}>
                        <ChatSidebar
                            chats={chats}
                            activeChatId={activeChatId}
                            isLoading={isLoading}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            onChatClick={handleChatClick}
                        />
                    </div>

                    <div className={`flex-1 ${activeChatClass} flex-col overflow-hidden`}>
                        <ChatWindow
                            activeChat={activeChat}
                            onBack={handleBackClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;