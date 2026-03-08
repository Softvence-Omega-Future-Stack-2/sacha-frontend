import { baseAPI } from "../../baseAPI/baseApi";

export const guaranteeApi = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getGuarantees: build.query<any, number | void>({
            query: (user_id) => ({
                url: user_id ? `/tenant/guarantee/?user_id=${user_id}` : "/tenant/guarantee/",
                method: "GET",
            }),
            providesTags: ["Guarantees"],
        }),
        addGuarantee: build.mutation({
            query: (formData: FormData) => ({
                url: "/tenant/guarantee/",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Guarantees"],
        }),
    }),
});

export const { useGetGuaranteesQuery, useAddGuaranteeMutation } = guaranteeApi;
