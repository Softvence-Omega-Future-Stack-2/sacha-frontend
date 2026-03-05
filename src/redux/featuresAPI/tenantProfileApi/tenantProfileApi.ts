import { baseAPI } from "../../baseAPI/baseApi";

export const tenantProfileApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    // GET TENANT PROFILE
    getTenantProfile: build.query({
      query: () => ({
        url: "/tenant/profile/me/",
        method: "GET",
      }),
      providesTags: ["TenantProfile"],
    }),

    // UPDATE TENANT PROFILE
    updateTenantProfile: build.mutation({
      query: (data) => ({
        url: "/tenant/profile/update_profile/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["TenantProfile"],
    }),
  }),
});

export const { useGetTenantProfileQuery, useUpdateTenantProfileMutation } =
  tenantProfileApi;
