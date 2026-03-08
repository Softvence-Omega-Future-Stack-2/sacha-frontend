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

    // GET TENANT FILE
    getTenantFile: build.query<any, void>({
      query: () => ({
        url: "/tenant/file/",
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

    // CREATE TENANT FILE
    createTenantFile: build.mutation<any, FormData>({
      query: (formData) => ({
        url: "/tenant/file/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["TenantProfile"],
    }),
  }),
});

export const { useGetTenantProfileQuery, useGetTenantFileQuery, useUpdateTenantProfileMutation, useCreateTenantFileMutation } =
  tenantProfileApi;
