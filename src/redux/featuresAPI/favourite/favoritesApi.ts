import { baseAPI } from "../../baseAPI/baseApi";

export const favoritesAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    // GET FAVORITE LIST
    getFavorites: build.query({
      query: () => ({
        url: "/tenant/favorites/",
        method: "GET",
      }),
      providesTags: ["Favorites"],
    }),

    // ⭐ The ONLY API you must use — add/remove both
    toggleFavorite: build.mutation({
      query: (propertyId) => ({
        url: "/tenant/favorites/toggle/",
        method: "POST",
        body: { property_id: propertyId },
      }),
      invalidatesTags: ["Favorites"],
    }),
  }),
});

export const { useGetFavoritesQuery, useToggleFavoriteMutation } = favoritesAPI;
