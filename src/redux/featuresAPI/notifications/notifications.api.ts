import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Notification {
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  type: string;
}

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL || "https://helloapart.duckdns.org"}/notifications/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Notifications"],
  endpoints: (builder) => ({
    getNotifications: builder.query<Notification[], void>({
      query: () => "list/",
      providesTags: ["Notifications"],
    }),
    getUnreadCount: builder.query<{ count: number }, void>({
      query: () => "unread-count/",
      providesTags: ["Notifications"],
    }),
    markAllRead: builder.mutation<void, void>({
      query: () => ({
        url: "mark-all-read/",
        method: "POST",
      }),
      invalidatesTags: ["Notifications"],
    }),
    markRead: builder.mutation<void, number>({
      query: (notificationId) => ({
        url: `mark-read/${notificationId}/`,
        method: "POST",
      }),
      invalidatesTags: ["Notifications"],
    }),
    saveToken: builder.mutation<void, { token: string }>({
      query: (body) => ({
        url: "save-token/",
        method: "POST",
        body,
      }),
    }),
    sendNotification: builder.mutation<void, { title: string; message: string; user_id: number }>({
      query: (body) => ({
        url: "send/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAllReadMutation,
  useMarkReadMutation,
  useSaveTokenMutation,
  useSendNotificationMutation,
} = notificationsApi;