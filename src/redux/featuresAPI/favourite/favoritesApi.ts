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

    // Add Favorite
    addFavorite: build.mutation({
      query: (formData) => ({
        url: "/tenant/favorites/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Favorites"],
    }),

    // Remove Favorite
    removeFavorite: build.mutation({
      query: (id) => ({
        url: `/tenant/favorites/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorites"],
    }),
  }),
});

export const { useGetFavoritesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation } = favoritesAPI;
