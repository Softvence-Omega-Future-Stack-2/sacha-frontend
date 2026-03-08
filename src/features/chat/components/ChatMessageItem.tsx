import React from 'react';

interface ChatMessageItemProps {
    id: number;
    sender: string;
    text: string;
    time: string;
    isMine: boolean;
}

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ sender, text, time, isMine }) => {
    return (
        <div className={`mb-4 flex ${isMine ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-[80%] lg:max-w-md px-4 py-2 rounded-2xl shadow-sm transition-all animate-in fade-in slide-in-from-bottom-2 duration-300 ${isMine
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                    }`}
            >
                {!isMine && (
                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1">{sender}</p>
                )}
                <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                    {text}
                </p>
                <p className={`text-[10px] mt-1 opacity-60 text-right ${isMine ? 'text-blue-100' : 'text-gray-400'}`}>
                    {time}
                </p>
            </div>
        </div>
    );
};

export default React.memo(ChatMessageItem);
