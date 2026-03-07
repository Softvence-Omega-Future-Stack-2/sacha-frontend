import React, { useState } from 'react';
import { useGetConversationsQuery } from '../../redux/featuresAPI/chat/chat.api';

const ChatWindow: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const { data: conversations, isLoading } = useGetConversationsQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex h-96 border rounded-lg">
      <div className="w-1/3 border-r">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Conversations</h3>
        </div>
        <div className="overflow-y-auto">
          {conversations?.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`p-3 cursor-pointer hover:bg-gray-100 ${selectedConversation === conv.id ? 'bg-blue-50' : ''
                }`}
            >
              <div className="font-medium">Conversation {conv.id}</div>
              <div className="text-sm text-gray-500">
                {conv.last_message?.content || 'No messages'}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1">
        {selectedConversation ? (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <h4 className="font-semibold">Chat</h4>
            </div>
            <div className="flex-1 p-4">
              {/* Messages will go here */}
            </div>
            <div className="p-4 border-t">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;