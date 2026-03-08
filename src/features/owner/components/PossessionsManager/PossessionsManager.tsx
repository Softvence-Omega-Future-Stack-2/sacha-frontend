import { Heart } from "lucide-react";
import Title from "../Title";
import Card from "./Card";
import { useState, useEffect } from "react";
import { useGetPossessionsQuery } from "../../../../redux/featuresAPI/tenant/possessions.api";

const ITEMS_PER_PAGE = 8;

const PossessionsSkeleton = () => {
  return (
    <div className="group p-3 relative bg-[#FBFBFB] rounded-xl overflow-hidden w-full max-w-sm mx-auto animate-pulse">
      <div className="relative overflow-hidden rounded-lg bg-gray-200 h-64 w-full"></div>
      <div className="space-y-4 mt-4">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="w-full mt-6 h-12 bg-gray-200 rounded-2xl"></div>
      </div>
    </div>
  );
};

const PossessionsManager: React.FC = () => {
  const { data, isLoading, isError, error, isFetching } = useGetPossessionsQuery();
  const possessions = data?.possessions?.ad_details || [];

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loadingMore, setLoadingMore] = useState(false);

  // We initialize favoriteIds when possessions are loaded
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    if (possessions.length > 0 && favoriteIds.length === 0) {
      setFavoriteIds(possessions.map((p) => p.ad_details.id.toString()));
    }
  }, [possessions]);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const favoriteProperties = possessions.filter((p) =>
    favoriteIds.includes(p.ad_details.id.toString())
  );
  const visibleProperties = favoriteProperties.slice(0, visibleCount);
  const hasMore = visibleCount < favoriteProperties.length;

  const handleViewMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + ITEMS_PER_PAGE, favoriteProperties.length)
      );
      setLoadingMore(false);
      window.scrollBy({ top: 300, behavior: "smooth" });
    }, 400);
  };

  return (
    <div className="bg-white">
      <div>
        <header className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6">
          <Title
            title="My Possessions"
            paragraph="Manage your assets and applications in the blink of an eye"
          />
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <PossessionsSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-24 text-red-500">
            <p className="text-2xl font-semibold">Failed to load possessions</p>
            <p className="mt-2 text-gray-500">
              {error?.toString() || "An unexpected error occurred."}
            </p>
          </div>
        ) : favoriteProperties.length === 0 ? (
          <div className="text-center py-24">
            <Heart className="w-20 h-20 mx-auto text-gray-300 mb-6" />
            <p className="text-2xl font-semibold text-gray-700">
              No favorite items yet
            </p>
            <p className="text-gray-500 mt-3">
              Click the heart icon on any property to save it here
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {visibleProperties.map((property) => {
                const adDetails = property.ad_details;
                const primaryImage = adDetails.images?.find((img) => img.is_primary)?.image || adDetails.images?.[0]?.image || "";

                return (
                  <Card
                    key={adDetails.id}
                    id={adDetails.id.toString()}
                    price={adDetails.rent.toString()}
                    title={adDetails.title}
                    location={adDetails.city}
                    image={primaryImage}
                    isFavorite={favoriteIds.includes(adDetails.id.toString())}
                    onToggleFavorite={toggleFavorite}
                    favoriteIds={favoriteIds}
                  />
                );
              })}
            </div>

            {hasMore && (
              <div className="flex justify-center pb-12">
                {loadingMore || isFetching ? (
                  <div className="py-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="text-sm text-gray-500 mt-3">
                      Loading more...
                    </p>
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
          </>
        )}
      </div>
    </div>
  );
};

export default PossessionsManager;
