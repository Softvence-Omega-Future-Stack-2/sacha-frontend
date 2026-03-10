import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
    reducerPath: "chatApi",
    tagTypes: ["Conversations", "Messages"],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://helloapart.duckdns.org",
        credentials: "include",
        prepareHeaders(headers, { getState }) {
            const token = (getState() as any).auth.accessToken;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: () => "/chat/conversations/",
            providesTags: ["Conversations"],
            transformResponse: (response: any) => {
                return Array.isArray(response) ? response : response.results || response.data || [];
            },
        }),

        createConversation: builder.mutation({
            query: (data) => ({
                url: "/chat/conversations/create/",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Conversations"]
        }),

        getMessages: builder.query({
            query: (roomId: string) => `/chat/messages/${roomId}/`,
            providesTags: ["Messages"],
            transformResponse: (response: any) => {
                return Array.isArray(response) ? response : response.results || response.data || [];
            },
        })

    })
});

export const {
    useGetConversationsQuery,
    useCreateConversationMutation,
    useGetMessagesQuery
} = chatApi;
