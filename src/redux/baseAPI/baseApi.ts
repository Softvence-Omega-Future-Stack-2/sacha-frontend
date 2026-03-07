import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

const baseQueryAPI = fetchBaseQuery({
  // baseUrl: import.meta.env.VITE_API_URL,
  // baseUrl: "http://16.171.195.199",
  baseUrl: "https://helloapart.duckdns.org",
  credentials: "include",
  prepareHeaders(headers, { getState }) {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQueryAPI,
  tagTypes: ["Auth", "Categories", "Properties", "Favorites", "TenantProfile", "TenantProof", "directory", "Guarantees", "Subscription", "Possessions"],
  endpoints: () => ({}),
});
