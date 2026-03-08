import { useState, useEffect } from 'react';
import { User, X } from 'lucide-react';
import { useGetConversationsQuery } from '../api/chat.api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAppSelector } from '../../../redux/hooks';
import { selectUser } from '../../../redux/featuresAPI/auth/auth.slice';

const MessageNotification = () => {
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const [lastMessageId, setLastMessageId] = useState<string | number | null>(null);

    const { data: conversations = [] } = useGetConversationsQuery(undefined, {
        pollingInterval: 5000,
    });

    useEffect(() => {
        if (conversations.length > 0) {
            const latestConv = conversations[0];
            const lastMsg = latestConv.last_message;

            if (lastMsg && lastMsg.id !== lastMessageId) {
                const senderVal = lastMsg.sender;
                // If the message is NOT from the current user (checks ID)
                if (Number(senderVal) !== user?.id) {
                    // Only notify if we already have a previous message ID (avoids initial load notification)
                    if (lastMessageId !== null) {
                        toast.custom((t) => (
                            <div
                                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                                    } max-w-md w-full bg-white shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 hover:scale-[1.02] transition-all duration-300 border-l-4 border-blue-600`}
                            >
                                <div className="flex-1 w-0 p-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 pt-0.5">
                                            {(latestConv.other_user?.dp_image || latestConv.other_user?.profile_picture) ? (
                                                <img
                                                    className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-100"
                                                    src={latestConv.other_user.dp_image || latestConv.other_user.profile_picture!}
                                                    alt=""
                                                />
                                            ) : (
                                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                                                    <User className="h-6 w-6" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-bold text-gray-900 truncate">
                                                    New message from {latestConv.other_user?.full_name || latestConv.other_user?.email || 'User'}
                                                </p>
                                                <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                                                    Just now
                                                </span>
                                            </div>
                                            <p className="mt-1 text-sm font-medium text-gray-600 line-clamp-2 leading-relaxed italic">
                                                "{lastMsg.text || ''}"
                                            </p>
                                            <div className="mt-3 flex items-center gap-3">
                                                <button
                                                    onClick={() => {
                                                        toast.dismiss(t.id);
                                                        const basePath = user?.role === 'owner' ? '/dashboard-owner' : '/dashboard-tenant';
                                                        navigate(`${basePath}/messages`, { state: { conversationId: latestConv.id } });
                                                    }}
                                                    className="flex-1 py-1.5 px-3 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
                                                >
                                                    Reply Now
                                                </button>
                                                <button
                                                    onClick={() => toast.dismiss(t.id)}
                                                    className="flex-1 py-1.5 px-3 bg-gray-50 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                                                >
                                                    Dismiss
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex border-l border-gray-100">
                                    <button
                                        onClick={() => toast.dismiss(t.id)}
                                        className="w-full border border-transparent rounded-none rounded-r-2xl p-4 flex items-center justify-center text-sm font-medium text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        ), {
                            duration: 6000,
                            position: 'top-right',
                        });
                    }
                }
                setLastMessageId(lastMsg.id);
            }
        }
    }, [conversations, lastMessageId, navigate, user]);

    return null;
};

export default MessageNotification;
