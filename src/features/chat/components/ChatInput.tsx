import { useState, useRef } from 'react';
import { Smile, Send, Loader2, X } from 'lucide-react';

interface ChatInputProps {
    onSendMessage: (content: string) => Promise<void>;
    isSending: boolean;
}

const mockEmojis = [
    '👍', '❤️', '😂', '🔥', '🙏', '💯', '😊', '😍', '😎', '🎉',
    '🤔', '😭', '🤯', '🍕', '☕', '🏥', '💊', '🦠', '🧪', '🧬'
];

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isSending }) => {
    const [inputMessage, setInputMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = async () => {
        if (!inputMessage.trim()) return;

        const content = inputMessage.trim();
        setInputMessage(''); // Clear immediately for snappy feel
        setShowEmojiPicker(false);

        try {
            await onSendMessage(content);
        } catch (err) {
            setInputMessage(content); // Restore on failure
        }
    };

    const handleEmojiSelect = (emoji: string) => {
        setInputMessage(prev => prev + emoji);
        inputRef.current?.focus();
    };

    return (
        <div className="px-4 py-3 bg-white border-t border-gray-100 relative">
            {showEmojiPicker && (
                <div className="absolute bottom-full left-4 mb-2 bg-white border border-gray-200 rounded-lg shadow-xl p-3 w-64 z-10 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-center border-b pb-2 mb-2">
                        <h4 className="text-xs font-semibold text-gray-500">Emojis</h4>
                        <button onClick={() => setShowEmojiPicker(false)} className="text-gray-400 hover:text-gray-600 outline-none">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto custom-scrollbar">
                        {mockEmojis.map((emoji, index) => (
                            <span
                                key={index}
                                className="text-xl cursor-pointer hover:bg-gray-100 rounded-md p-1 transition-all hover:scale-110"
                                onClick={() => handleEmojiSelect(emoji)}
                            >
                                {emoji}
                            </span>
                        ))}
                    </div>
                </div>
            )}



            <div className="flex items-end gap-2 bg-gray-50 rounded-2xl px-3 py-2 border border-gray-100 focus-within:border-blue-300 focus-within:bg-white transition-all shadow-sm">




                <button
                    className={`text-gray-400 hover:text-blue-600 transition-colors p-1.5 ${showEmojiPicker ? 'text-blue-600' : ''}`}
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                    <Smile className="w-5 h-5" />
                </button>

                <textarea
                    ref={inputRef}
                    rows={1}
                    placeholder="Type a message..."
                    className="flex-1 resize-none bg-transparent text-sm focus:outline-none py-2 max-h-32 custom-scrollbar outline-none"
                    value={inputMessage}
                    onChange={(e) => {
                        setInputMessage(e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`;
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />

                <button
                    className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed shadow-md"
                    onClick={handleSend}
                    disabled={(!inputMessage.trim()) || isSending}
                >
                    {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
            </div>
        </div>
    );
};

export default ChatInput;
