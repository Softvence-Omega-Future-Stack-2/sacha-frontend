import { baseAPI } from "../../baseAPI/baseApi";

export const propertyAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    addProperty: build.mutation({
      query: (data) => ({
        url: "/properties/my-properties/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Properties"],
    }),
    getProperties: build.query({
      query: () => ({
        url: "/properties/list/",
        method: "GET",
      }),
      providesTags: ["Properties"],
    }),
    deleteProperty: build.mutation({
      query: (id) => ({
        url: `/properties/my-properties/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Properties"],
    }),
    updateProperty: build.mutation({
      query: ({ id, data }) => ({
        url: `/properties/my-properties/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Properties"],
    }),

    // ⭐⭐⭐ NEW SEARCH API ⭐⭐⭐
    searchProperties: build.query({
      query: (params) => ({
        url: "/properties/list/",
        method: "GET",
        params: params, // {property_type, price, location}
      }),
      providesTags: ["Properties"],
    }),
    getPublicAds: build.query({
      query: () => ({
        url: "/owner/public/ads/",
        method: "GET",
      }),
      providesTags: ["Properties"],
    }),
  }),
});

export const {
  useAddPropertyMutation,
  useGetPropertiesQuery,
  useDeletePropertyMutation,
  useUpdatePropertyMutation,
  useSearchPropertiesQuery,
  useGetPublicAdsQuery,
} = propertyAPI;
