import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Message {
  id: number;
  content: string;
  sender: number;
  timestamp: string;
  room_id: string;
}

export interface Conversation {
  id: string;
  participants: any[]; // Changed to any[] to be more flexible with participant objects
  last_message?: Message;
  created_at: string;
  room_name?: string;
  other_participant?: {
    id: number;
    username: string;
    avatar?: string;
  };
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL || "https://helloapart.duckdns.org"}/chat/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.accessToken; // Changed to accessToken to match baseApi
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Conversations", "Messages"],
  endpoints: (builder) => ({
    getConversations: builder.query<Conversation[], void>({
      query: () => "conversations/",
      providesTags: ["Conversations"],
    }),
    createConversation: builder.mutation<Conversation, { participant_id: number }>({
      query: (body) => ({
        url: "conversations/create/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Conversations"],
    }),
    getMessages: builder.query<Message[], string>({
      query: (roomId) => `messages/${roomId}/`,
      providesTags: ["Messages"],
    }),
    sendMessage: builder.mutation<Message, { room_id: string; content: string }>({
      query: ({ room_id, content }) => ({
        url: `messages/${room_id}/`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: ["Messages", "Conversations"],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useCreateConversationMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
} = chatApi;