import Title from '../Title';
import ChatSidebar from '../../../chat/components/ChatSidebar';
import ChatWindow from '../../../chat/components/ChatWindow';
import { useChatConversations } from '../../../chat/hooks/useChatConversations';
import { useAppSelector } from '../../../../redux/hooks';
import { selectUser } from '../../../../redux/featuresAPI/auth/auth.slice';

export default function MessagesInbox() {
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

    const user = useAppSelector(selectUser);
    const paragraphText = user?.role === 'owner'
        ? 'Communicate with your property managers and tenants'
        : 'Communicate with property owners and agents';

    const sidebarClass = isChatOpenOnMobile ? 'hidden lg:flex' : 'flex';
    const activeChatClass = isChatOpenOnMobile ? 'flex' : 'hidden lg:flex';

    return (
        <div className="flex flex-col h-[calc(100vh-140px)]">
            <Title title='Messages' paragraph={paragraphText} />

            <div className="flex-1 flex overflow-hidden bg-white border border-gray-100 rounded-3xl shadow-sm mt-4">
                <div className={`w-full lg:w-96 ${sidebarClass} flex-col`}>
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
    );
}
