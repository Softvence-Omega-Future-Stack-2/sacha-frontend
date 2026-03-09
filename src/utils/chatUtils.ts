import { useCreateConversationMutation } from '../features/chat/api/chat.api';
import { useNavigate } from 'react-router-dom';

export const useChatUtils = () => {
    const [createConversation] = useCreateConversationMutation();
    const navigate = useNavigate();

    const startConversation = async (participantId: number) => {
        try {
            const result = await createConversation({ participant_id: participantId }).unwrap();
            navigate('/chat', {
                state: { conversationId: result.id }
            });
        } catch (error) {
            console.error('Failed to create conversation:', error);
            // Navigate to chat anyway - existing conversation might be found
            navigate('/chat');
        }
    };

    return { startConversation };
};