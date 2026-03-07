import { baseAPI } from "../../baseAPI/baseApi";

export const guaranteeApi = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getGuarantees: build.query({
            query: () => ({
                url: "/tenant/guarantee/",
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
