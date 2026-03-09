import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useChatUtils } from '../../utils/chatUtils';

interface ContactButtonProps {
    userId: number;
    userName?: string;
    className?: string;
    variant?: 'primary' | 'secondary';
}

const ContactButton: React.FC<ContactButtonProps> = ({
    userId,
    userName = 'owner',
    className = '',
    variant = 'primary'
}) => {
    const { startConversation } = useChatUtils();

    const handleContact = () => {
        startConversation(userId);
    };

    const baseClasses = "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors";
    const variantClasses = variant === 'primary'
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300";

    return (
        <button
            onClick={handleContact}
            className={`${baseClasses} ${variantClasses} ${className}`}
        >
            <MessageCircle className="w-4 h-4" />
            Contact {userName}
        </button>
    );
};

export default ContactButton;