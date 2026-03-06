import { Heart, MapPin } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import furniture from "../../assets/funiture.png";
import meter from "../../assets/meter.png";
import room from "../../assets/room.png";

import { useGetPublicAdsQuery } from "../../redux/featuresAPI/properties/property.api";
import {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "../../redux/featuresAPI/favourite/favoritesApi";
import type { RootState } from "../../redux/store";

interface AdImage {
  id: number;
  image: string;
  is_primary: boolean;
}

interface AdItem {
  id: number;
  title: string;
  display_address: string;
  address: string;
  furnished: boolean;
  rooms: number;
  surface_sqm: number;
  rent: string;
  images: AdImage[];
}

const FeaturedApartments: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Conditionally fetch favorites if the user is authenticated
  const token = useSelector((state: RootState) => state.auth?.accessToken);

  // Queries
  const {
    data: adsData,
    isLoading: isAdsLoading,
    isError: isAdsError,
  } = useGetPublicAdsQuery({});

  const { data: favData } = useGetFavoritesQuery(undefined, {
    skip: !token,
  });

  // Mutations
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const [toastMessage, setToastMessage] = useState("");

  // Map to store which ad correlates to which favorite request ID
  const favoritesMap = useMemo(() => {
    const map: Record<number, number> = {};
    const arrayData = Array.isArray(favData) ? favData : favData?.results;
    if (arrayData && Array.isArray(arrayData)) {
      arrayData.forEach((fav: any) => {
        // Handle cases where `ad` could be an object or an ID
        const adId =
          fav.ad !== null && typeof fav.ad === "object" ? fav.ad.id : fav.ad;
        if (adId !== undefined) {
          map[adId] = fav.id;
        }
      });
    }
    return map;
  }, [favData]);

  const toggleFavorite = async (adId: number) => {
    if (!token) {
      setToastMessage("Please login to save favorites");
      setTimeout(() => setToastMessage(""), 2500);
      return;
    }

    try {
      const favoriteId = favoritesMap[adId];
      if (favoriteId) {
        await removeFavorite(favoriteId).unwrap();
        setToastMessage("Removed from favorites");
      } else {
        const formData = new FormData();
        formData.append("ad", adId.toString());
        await addFavorite(formData).unwrap();
        setToastMessage("Saved to Favorites");
      }
      setTimeout(() => setToastMessage(""), 2500);
    } catch (error) {
      console.error("Toggle favorite failed:", error);
      setToastMessage("Failed to update favorite");
      setTimeout(() => setToastMessage(""), 2500);
    }
  };

  const adsList: AdItem[] = useMemo(() => {
    if (Array.isArray(adsData)) return adsData;
    if (adsData?.results) return adsData.results;
    return [];
  }, [adsData]);

  const handleViewDetails = (id: number) => {
    navigate(`/apartments/product-details/${id}`);
  };

  return (
    <>
      {/* Toast */}
      {toastMessage && (
        <div className="fixed inset-0 flex items-start justify-end p-6 pointer-events-none z-[9999]">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-7 py-5 rounded-2xl shadow-2xl flex items-center gap-3">
            <Heart className="w-7 h-7 fill-white" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-[#1a1a4d] mb-2">
                {t("featured.title_prefix") || "Latest"}{" "}
                <span className="italic font-normal larken-font">
                  {t("featured.title_suffix") || "Apartments"}
                </span>
              </h1>
              <p className="text-base text-[#1a1a4d]">
                {t("featured.subtitle") || "Find your next home with us"}
              </p>
            </div>

            <Link to="/apartments" className="mt-4 sm:mt-0 px-4 py-3 border-2 border-[#0612511A] text-[#1a1a4d] rounded-lg font-normal hover:bg-[#1a1a4d] hover:text-white transition-colors duration-200 text-xs">
              {t("featured.view_all") || "View All"}
            </Link>
          </div>

          {/* Error State */}
          {isAdsError && !isAdsLoading && (
            <div className="text-center py-20 text-red-500">
              Failed to load featured ads. Please try again later.
            </div>
          )}

          {/* Skeleton Loaders */}
          {isAdsLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
              {[1, 2, 3].map((n) => (
                <div key={n} className="p-3 bg-[#FBFBFB] rounded-2xl h-full animate-pulse">
                  <div className="rounded-2xl flex flex-col h-full">
                    <div className="relative h-[260px] bg-gray-200 rounded-2xl overflow-hidden" />
                    <div className="p-0 mt-6 flex flex-col space-y-4">
                      <div className="h-8 bg-gray-200 rounded w-1/3" />
                      <div className="h-12 bg-gray-200 rounded w-full" />
                      <div className="h-6 bg-gray-200 rounded w-2/3" />
                      <div className="h-10 bg-gray-200 rounded w-full mt-auto" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isAdsLoading && !isAdsError && adsList.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No featured ads available at the moment.
            </div>
          )}

          {/* Apartments Grid */}
          {!isAdsLoading && adsList.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
              {adsList.slice(0, 6).map((ad) => {
                const primaryImage =
                  ad.images?.find((img) => img.is_primary)?.image ||
                  (ad.images?.length > 0 ? ad.images[0].image : "/no-image.png");

                const isFavorite = !!favoritesMap[ad.id];

                return (
                  <div
                    key={ad.id}
                    className="p-3 bg-[#FBFBFB] rounded-2xl h-full"
                  >
                    <div className="rounded-2xl flex flex-col h-full">
                      {/* IMAGE */}
                      <div className="relative h-[260px] overflow-hidden rounded-2xl group">
                        <img
                          src={primaryImage}
                          alt={ad.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />

                        {/* Favorite Button */}
                        <button
                          onClick={() => toggleFavorite(ad.id)}
                          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                        >
                          <Heart
                            className={`w-5 h-5 ${isFavorite
                              ? "fill-red-500 text-white"
                              : "text-white"
                              }`}
                          />
                        </button>
                      </div>

                      {/* BODY */}
                      <div className="p-0 mt-6 flex flex-col h-full">
                        {/* Price */}
                        <div className="mb-3">
                          <span className="text-3xl font-bold text-[#0d6efd]">
                            €{Number(ad.rent).toFixed(0)}
                          </span>
                          <span className="text-sm text-gray-600">
                            {" "}
                            {t("featured.month_cc") || "/month"}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-[#061251] mb-3 line-clamp-2 min-h-[56px]">
                          {ad.title}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center gap-2 text-[#061251] mb-4 min-h-[24px]">
                          <MapPin className="w-4 h-4 shrink-0" />
                          <span className="text-sm truncate max-w-[200px]">
                            {ad.display_address || ad.address}
                          </span>
                        </div>

                        {/* Features */}
                        <div className="flex items-center gap-4 mb-5 text-[#646492] min-h-[40px]">
                          <div className="flex items-center gap-1.5">
                            <img src={furniture} className="w-6 h-6" alt="furniture" />
                            <span className="text-xs">
                              {ad.furnished ? "Furnished" : "Unfurnished"}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <img src={room} className="w-6 h-6" alt="room" />
                            <span className="text-xs">
                              {ad.rooms} {ad.rooms > 1 ? "Rooms" : "Room"}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <img src={meter} className="w-6 h-6" alt="area" />
                            <span className="text-xs">{ad.surface_sqm} m²</span>
                          </div>
                        </div>

                        {/* Button */}
                        <button
                          onClick={() => handleViewDetails(ad.id)}
                          className="mt-auto w-full cursor-pointer py-1.5 border border-[#06125133] text-[#061251] 
                          rounded-xl font-medium hover:bg-[#1077FF] hover:text-white transition-colors"
                        >
                          {t("featured.view_details") || "View Details"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FeaturedApartments;
