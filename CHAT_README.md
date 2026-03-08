# Chat Implementation

This implementation provides a complete chat system for the Sacha frontend application, matching the API endpoints you provided.

## Features

- Real-time messaging with WebSocket support
- Conversation management
- Message history
- Responsive design (mobile/desktop)
- Integration with property details

## API Endpoints Used

- `GET /chat/conversations/` - Fetch all conversations
- `POST /chat/conversations/create/` - Create new conversation
- `GET /chat/messages/{room_id}/` - Fetch messages for a conversation

## Components

### Pages
- `/src/pages/Chat/Chat.tsx` - Standalone chat page

### Components
- `/src/features/chat/components/ChatSidebar.tsx` - Conversation list
- `/src/features/chat/components/ChatWindow.tsx` - Message display and input
- `/src/features/chat/components/ChatInput.tsx` - Message input component
- `/src/features/chat/components/ChatMessageItem.tsx` - Individual message display
- `/src/components/Chat/ContactButton.tsx` - Button to start conversations

### Hooks
- `/src/features/chat/hooks/useChatConversations.ts` - Manage conversations
- `/src/features/chat/hooks/useChatMessages.ts` - Handle messages
- `/src/features/chat/hooks/useChatSocket.ts` - WebSocket connection

### API
- `/src/features/chat/api/chat.api.ts` - RTK Query endpoints
- `/src/features/chat/types.ts` - TypeScript interfaces

## Usage

### Accessing Chat
- Navigate to `/chat` for standalone chat interface
- Use dashboard messages in `/dashboard-owner/messages` or `/dashboard-tenant/messages`

### Starting Conversations
```tsx
import ContactButton from '../components/Chat/ContactButton';

// In any component
<ContactButton 
  userId={propertyOwnerId} 
  userName="owner"
  variant="primary"
/>
```

### Using Chat Utils
```tsx
import { useChatUtils } from '../utils/chatUtils';

const { startConversation } = useChatUtils();

// Start conversation programmatically
startConversation(userId);
```

## Message Format

Messages follow this structure:
```typescript
interface Message {
  id: number;
  conversation: number;
  sender: number;
  sender_info: {
    id: number;
    email: string;
    profile_picture?: string | null;
    full_name?: string | null;
  };
  text: string;
  timestamp: string;
  is_read: boolean;
}
```

## WebSocket Connection

The chat uses WebSocket for real-time messaging:
- URL: `wss://helloapart.duckdns.org/ws/chat/{room_id}/?token={token}`
- Automatic reconnection with exponential backoff
- Optimistic updates for better UX

## Integration Points

1. **Property Details**: Contact button added to property overview
2. **Dashboard**: Existing message inbox components updated
3. **Navigation**: Chat route added to router

## Authentication

All chat features require user authentication. The system automatically:
- Includes Bearer token in API requests
- Passes token to WebSocket connection
- Redirects to login if not authenticated