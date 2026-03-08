import { baseAPI } from "../../baseAPI/baseApi";

export interface SpouseRequest {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    professional_situation: string;
    net_income: number;
}

export const spouseApi = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getTenantSpouses: build.query<any, number | void>({
            query: (user_id) => ({
                url: user_id ? `/tenant/spouse/?user_id=${user_id}` : "/tenant/spouse/",
                method: "GET",
            }),
            providesTags: ["TenantProfile"],
        }),
        addTenantSpouse: build.mutation({
            query: (data: FormData) => ({
                url: "/tenant/spouse/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["TenantProfile"],
        }),
    }),
});

export const { useAddTenantSpouseMutation, useGetTenantSpousesQuery } = spouseApi;
