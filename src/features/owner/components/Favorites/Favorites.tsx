

import Title from "../Title";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "../../../../redux/featuresAPI/favourite/favoritesApi";
import CardFavoritesPages from "./Card";

const ITEMS_PER_PAGE = 8;

const FavoritesPages: React.FC = () => {
  const { data, isLoading: isFavoritesLoading } =
    useGetFavoritesQuery(undefined);
  const [removeFavorite] = useRemoveFavoriteMutation();

  const [favorites, setFavorites] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(false);

  // FORMAT API → UI
  useEffect(() => {
    if (data?.favorites) {
      const formatted = data.favorites.map((item: any) => {
        const ad = item.ad_details;
        return {
          id: ad.id.toString(),
          favoriteId: item.id,
          price: ad.rent,
          title: ad.title,
          location: `${ad.city}, ${ad.postal_code}`,
          image: ad.images?.find((img: any) => img.is_primary)?.image || ad.images?.[0]?.image || "/no-image.png",
          isFavorite: true,
        };
      });
      setFavorites(formatted);
    } else if (data?.results) {
      const formatted = data.results.map((item: any) => {
        const p = item.property_details || item.ad || {};
        return {
          id: (p.id || item.ad || "").toString(),
          favoriteId: item.id,
          price: p.total_rent || p.rent,
          title: p.title,
          location: p.address || p.display_address,
          image: p.images?.length ? (p.images[0].image || p.images[0]) : "/no-image.png",
          isFavorite: true,
        };
      });
      setFavorites(formatted);
    }
  }, [data]);

  const visibleProperties = favorites.slice(0, visibleCount);
  const hasMore = visibleCount < favorites.length;

  // REMOVE FROM FAVORITE
  const handleRemove = async (id: string) => {
    const favorite = favorites.find(f => f.id === id);
    if (!favorite) return;

    try {
      await removeFavorite(favorite.favoriteId).unwrap();

      setFavorites((prev) => prev.filter((item) => item.id !== id));

      toast.success(
        "Removed from favorites",
        {
          duration: 2000,
          position: "top-center",
          style: { background: "#333", color: "#fff" },
        }
      );
    } catch (error) {
      toast.error("Failed to update favorite");
    }
  };

  // VIEW MORE HANDLER
  const handleViewMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + ITEMS_PER_PAGE, favorites.length)
      );
      setLoading(false);
      window.scrollBy({ top: 300, behavior: "smooth" });
    }, 400);
  };

  return (
    <div className="bg-white">
      <Toaster />

      {/* HEADER */}
      <header className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6">
        <Title
          title="My Favorites"
          paragraph="Manage your assets and applications in the blink of an eye"
        />
      </header>

      {isFavoritesLoading ? (
        <div className="text-center py-20 text-gray-500">Loading...</div>
      ) : (
        <>
          {/* GRID WITH UPDATED CARD COMPONENT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {visibleProperties.map((property) => (
              <CardFavoritesPages
                key={property.id}
                id={property.id}
                price={property.price}
                title={property.title}
                location={property.location}
                image={property.image}
                onRemove={handleRemove}
              />
            ))}
          </div>

          {/* VIEW MORE */}
          {hasMore && (
            <div className="flex justify-center pb-12">
              {loading ? (
                <div className="py-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-3">Loading more...</p>
                </div>
              ) : (
                <button
                  onClick={handleViewMore}
                  className="px-10 py-4 bg-white border mt-4 cursor-pointer border-[#646492] rounded-xl text-sm font-bold text-[#061251] uppercase tracking-wider hover:border-gray-400 transition-all duration-200"
                >
                  View More
                </button>
              )}
            </div>
          )}

          {/* NO FAVORITES */}
          {favorites.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg">No favorite properties yet.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FavoritesPages;
