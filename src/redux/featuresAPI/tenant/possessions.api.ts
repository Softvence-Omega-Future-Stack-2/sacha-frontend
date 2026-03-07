import { baseAPI } from "../../baseAPI/baseApi";

export const possessionsApi = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getPossessions: build.query({
            query: () => ({
                url: "/tenant/possessions/",
                method: "GET",
            }),
            providesTags: ["Possessions"],
        }),
        createPossession: build.mutation({
            query: (data: { ad: number }) => ({
                url: "/tenant/possessions/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Possessions"],
        }),
    }),
});

export const { useGetPossessionsQuery, useCreatePossessionMutation } = possessionsApi;
