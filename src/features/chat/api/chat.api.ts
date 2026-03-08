import { baseAPI } from "../../../redux/baseAPI/baseApi";
import type { Message, Conversation } from "../types";

export const chatApi = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query<Conversation[], void>({
            query: () => "/chat/conversations/",
            transformResponse: (response: any) => {
                return Array.isArray(response) ? response : response.results || response.data || [];
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: "Conversations" as any, id })),
                        { type: "Conversations" as any, id: "LIST" },
                    ]
                    : [{ type: "Conversations" as any, id: "LIST" }],
        }),
        createConversation: builder.mutation<Conversation, { participant_id: number }>({
            query: (body) => ({
                url: "/chat/conversations/create/",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Conversations" as any, id: "LIST" }],
        }),
        getMessages: builder.query<Message[] | { results: Message[] }, string>({
            query: (roomId) => `/chat/conversations/${roomId}/messages/`,
            transformResponse: (response: any) => {
                const messages = Array.isArray(response) ? response : response.results || response.data || [];
                console.log(`[ChatApi] Fetched ${messages.length} messages for room ${response.roomId || 'unknown'}`);
                return messages;
            },
            providesTags: (result, _error, roomId) =>
                Array.isArray(result)
                    ? [
                        ...result.map(({ id }) => ({ type: "Messages" as any, id })),
                        { type: "Messages" as any, id: roomId },
                    ]
                    : [{ type: "Messages" as any, id: roomId }],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetConversationsQuery,
    useCreateConversationMutation,
    useGetMessagesQuery,
} = chatApi;
