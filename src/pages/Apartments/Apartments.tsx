import { useState, useMemo } from "react";
import Header from "../../components/Apartments/Header";
import SeachComponents from "../../components/Apartments/SearchComponents";
import ApartmentCard from "../../components/Apartments/Card";
import { useSearchParams } from "react-router-dom";
import { useGetPublicAdsQuery } from "../../redux/featuresAPI/owner/owner.api";
import { useGetFavoritesQuery } from "../../redux/featuresAPI/favourite/favoritesApi";

const ApartmentSkeleton = () => (
  <div className="relative top-5 bg-[#FBFBFB] p-2 rounded-xl border border-gray-100 animate-pulse">
    <div className="h-48 bg-gray-200 rounded-lg w-full"></div>
    <div className="p-4 space-y-4">
      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="flex gap-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="h-12 bg-gray-200 rounded w-full"></div>
    </div>
  </div>
);

const App = () => {
  const [visibleCount, setVisibleCount] = useState(9);
  const [searchParams] = useSearchParams();

  const { data, isLoading, isError } = useGetPublicAdsQuery({});
  const { data: favoritesData } = useGetFavoritesQuery({});

  const apartments = useMemo(() => {
    if (!data) return [];

    // Handle both array and object responses
    const adsArray = Array.isArray(data) ? data : (data.results || []);

    let filtered = [...adsArray];

    // Frontend Filtering Logic
    const propertyType = searchParams.get("property_type");
    const location = searchParams.get("location")?.toLowerCase();
    const rentalType = searchParams.get("rental_type")?.toLowerCase();
    const priceRange = searchParams.get("price_range");
    const rooms = searchParams.get("rooms");

    if (propertyType) {
      filtered = filtered.filter((ad: any) => ad.property_type === propertyType || ad.ad_type === propertyType);
    }

    if (location) {
      filtered = filtered.filter((ad: any) =>
        ad.city?.toLowerCase().includes(location) ||
        ad.address?.toLowerCase().includes(location) ||
        ad.postal_code?.toLowerCase().includes(location)
      );
    }

    if (rentalType) {
      filtered = filtered.filter((ad: any) => ad.rental_type?.toLowerCase() === rentalType);
    }

    if (priceRange) {
      let min = 0;
      let max = Infinity;
      if (priceRange.startsWith("Over")) {
        min = parseInt(priceRange.replace(/[^0-9]/g, ""));
      } else {
        const match = priceRange.match(/€([\d,]+) - €([\d,]+)/);
        if (match) {
          min = parseInt(match[1].replace(/,/g, ""));
          max = parseInt(match[2].replace(/,/g, ""));
        }
      }
      filtered = filtered.filter((ad: any) => ad.rent >= min && ad.rent <= max);
    }

    if (rooms) {
      const minRooms = parseInt(rooms.replace("+", ""));
      filtered = filtered.filter((ad: any) => ad.rooms >= minRooms);
    }

    const favoritesMap = new Map();
    if (favoritesData?.favorites) {
      favoritesData.favorites.forEach((fav: any) => {
        favoritesMap.set(fav.ad, fav.id);
      });
    } else if (favoritesData?.results) {
      favoritesData.results.forEach((fav: any) => {
        const adId = fav.ad || fav.property_details?.id;
        if (adId) favoritesMap.set(adId, fav.id);
      });
    }

    return filtered.map((ad: any) => ({
      id: ad.id,
      imageUrl: ad.images?.find((img: any) => img.is_primary)?.image || ad.images?.[0]?.image || '',
      price: `€${(ad.rent || 0).toLocaleString()}`,
      frequency: "/month CC",
      title: ad.title || 'Untitled Property',
      location: `${ad.city || ''}, ${ad.postal_code || ''}`.replace(/^,\s*|,\s*$/g, ''),
      details: {
        furniture: ad.rental_type === "furnished" || ad.furnished === true,
        rooms: (ad.rooms || 0).toString(),
        area: `${ad.surface_sqm || 0} m²`,
      },
      favoriteId: favoritesMap.get(ad.id),
    }));
  }, [data, favoritesData, searchParams]);

  const handleShowMore = () => {
    setVisibleCount(apartments.length);
  };

  return (
    <div className="bg-[#FFFFFF] font-sans pb-20">
      <Header />

      <div className="container m-auto p-4 md:p-8 lg:px-16">
        <SeachComponents onSearch={() => setVisibleCount(9)} />

        {/* Apartment Cards */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 relative -top-15 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <ApartmentSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl relative -top-15">
            <h3 className="text-xl font-semibold text-red-600">Impossible de charger les appartements</h3>
            <p className="text-gray-500 mt-2">Veuillez essayer plus tard ou modifier votre recherche.</p>
          </div>
        ) : apartments.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl relative -top-15">
            <h3 className="text-xl font-semibold text-[#061251]">No apartments found</h3>
            <p className="text-gray-500 mt-2">Essayez d'ajuster vos filtres pour trouver davantage de propriétés.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 relative -top-15 lg:grid-cols-3">
            {apartments.slice(0, visibleCount).map((apartment: any) => (
              <ApartmentCard
                key={apartment.id}
                apartment={apartment}
                favoriteId={apartment.favoriteId}
              />
            ))}
          </div>
        )}

        {/* SHOW MORE Button */}
        {!isLoading && !isError && visibleCount < apartments.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleShowMore}
              className="px-10 py-3 text-[#061251] rounded-full font-semibold hover:bg-[#061251] hover:text-white transition-all duration-300 border-2 border-[#061251]"
            >
              Afficher plus
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
