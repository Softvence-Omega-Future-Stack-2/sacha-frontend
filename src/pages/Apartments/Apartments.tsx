// "use client";

// import { useState } from "react";
// import Header from "../../components/Apartments/Header";
// import SeachComponents from "../../components/Apartments/SearchComponents";
// import ApartmentCard from "../../components/Apartments/Card";

// // Dummy apartment data simulating a backend API response
// const apartments = [
//   {
//     id: 1,
//     imageUrl: "apartment-exterior-image.jpg",
//     price: "€585",
//     frequency: "/month CC",
//     title: "Appartement moderne T3 - Marais",
//     location: "Malibu, California",
//     details: { furniture: true, rooms: "3", area: "82 m2" },
//   },
//   {
//     id: 2,
//     imageUrl: "apartment-bedroom-image.jpg",
//     price: "€585",
//     frequency: "/month CC",
//     title: "Appartement moderne T3 - Marais",
//     location: "Malibu, California",
//     details: { furniture: true, rooms: "3", area: "82 m2" },
//   },
//   {
//     id: 3,
//     imageUrl: "apartment-livingroom-image.jpg",
//     price: "€585",
//     frequency: "/month CC",
//     title: "Appartement moderne T3 - Marais",
//     location: "Malibu, California",
//     details: { furniture: true, rooms: "3", area: "82 m2" },
//   },
//   {
//     id: 4,
//     imageUrl: "apartment-livingroom-image.jpg",
//     price: "€585",
//     frequency: "/month CC",
//     title: "Appartement moderne T3 - Marais",
//     location: "Malibu, California",
//     details: { furniture: true, rooms: "3", area: "82 m2" },
//   },
//   {
//     id: 5,
//     imageUrl: "apartment-livingroom-image.jpg",
//     price: "€585",
//     frequency: "/month CC",
//     title: "Appartement moderne T3 - Marais",
//     location: "Malibu, California",
//     details: { furniture: true, rooms: "3", area: "82 m2" },
//   },
//   {
//     id: 6,
//     imageUrl: "apartment-livingroom-image.jpg",
//     price: "€585",
//     frequency: "/month CC",
//     title: "Appartement moderne T3 - Marais",
//     location: "Malibu, California",
//     details: { furniture: true, rooms: "3", area: "82 m2" },
//   },
//   {
//     id: 7,
//     imageUrl: "apartment-livingroom-image.jpg",
//     price: "€585",
//     frequency: "/month CC",
//     title: "Appartement moderne T3 - Marais",
//     location: "Malibu, California",
//     details: { furniture: true, rooms: "3", area: "82 m2" },
//   },
//   {
//     id: 8,
//     imageUrl: "apartment-livingroom-image.jpg",
//     price: "€585",
//     frequency: "/month CC",
//     title: "Appartement moderne T3 - Marais",
//     location: "Malibu, California",
//     details: { furniture: true, rooms: "3", area: "82 m2" },
//   },
//   {
//     id: 9,
//     imageUrl: "apartment-livingroom-image.jpg",
//     price: "€585",
//     frequency: "/month CC",
//     title: "Appartement moderne T3 - Marais",
//     location: "Malibu, California",
//     details: { furniture: true, rooms: "3", area: "82 m2" },
//   },
//   {
//     id: 10,
//     imageUrl: "apartment-livingroom-image.jpg",
//     price: "€585",
//     frequency: "/month CC",
//     title: "Appartement moderne T3 - Marais",
//     location: "Malibu, California",
//     details: { furniture: true, rooms: "3", area: "82 m2" },
//   },
//   {
//     id: 11,
//     imageUrl: "apartment-livingroom-image.jpg",
//     price: "€585",
//     frequency: "/month CC",
//     title: "Appartement moderne T3 - Marais",
//     location: "Malibu, California",
//     details: { furniture: true, rooms: "3", area: "82 m2" },
//   },
//   {
//     id: 12,
//     imageUrl: "apartment-livingroom-image.jpg",
//     price: "€585",
//     frequency: "/month CC",
//     title: "Appartement moderne T3 - Marais",
//     location: "Malibu, California",
//     details: { furniture: true, rooms: "3", area: "82 m2" },
//   },
//   {
//     id: 13,
//     imageUrl: "apartment-livingroom-image.jpg",
//     price: "€585",
//     frequency: "/month CC",
//     title: "Appartement moderne T3 - Marais",
//     location: "Malibu, California",
//     details: { furniture: true, rooms: "3", area: "82 m2" },
//   },
//   {
//     id: 14,
//     imageUrl: "apartment-livingroom-image.jpg",
//     price: "€585",
//     frequency: "/month CC",
//     title: "Appartement moderne T3 - Marais",
//     location: "Malibu, California",
//     details: { furniture: true, rooms: "3", area: "82 m2" },
//   },
// ];

// const App = () => {
//   // Show only first 9 cards
//   const [visibleCount, setVisibleCount] = useState(9);

//   // Show all on click
//   const handleShowMore = () => {
//     setVisibleCount(apartments.length);
//   };

//   const handleModifySearch = () => {
//     alert("Search functionality would be implemented here!");
//   };

//   return (
//     <div className="bg-[#FFFFFF] font-sans">
//       <Header />

//       <div className="container m-auto p-4 md:p-8 lg:px-16">
//         <SeachComponents onSearch={handleModifySearch} />

//         {/* Apartment Cards */}
//         <div className="grid gap-6 md:grid-cols-2 relative -top-15 lg:grid-cols-3">
//           {apartments.slice(0, visibleCount).map((apartment) => (
//             <ApartmentCard key={apartment.id} apartment={apartment} />
//           ))}
//         </div>

//         {/* SHOW MORE Button */}
//         {visibleCount === 9 && (
//           <div className="flex justify-center ">
//             <button
//               onClick={handleShowMore}
//               className="px-6 py-3 text-[#061251] rounded-lg font-medium hover:bg-opacity-80 border border-[#061251]"
//             >
//               Show More
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;

"use client";

import { useState, useMemo } from "react";
import Header from "../../components/Apartments/Header";
import SeachComponents from "../../components/Apartments/SearchComponents";
import ApartmentCard from "../../components/Apartments/Card";

import { useSearchParams } from "react-router-dom";
import { useGetPublicAdsQuery } from "../../redux/featuresAPI/owner/owner.api";

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

  const propertyType = searchParams.get("property_type") || "";
  const location = searchParams.get("location") || "";
  const priceRange = searchParams.get("price_range") || "";

  // Parse price range
  const priceParams = useMemo(() => {
    if (!priceRange || priceRange === "Any price") return {};
    if (priceRange.startsWith("Over")) {
      return { min_rent: priceRange.replace(/[^0-9]/g, "") };
    }
    const match = priceRange.match(/€([\d,]+) - €([\d,]+)/);
    if (match) {
      return {
        min_rent: match[1].replace(/,/g, ""),
        max_rent: match[2].replace(/,/g, ""),
      };
    }
    return {};
  }, [priceRange]);

  const { data, isLoading, isError } = useGetPublicAdsQuery({
    property_type: propertyType.toLowerCase(),
    city: location,
    ...priceParams,
  });

  const apartments = useMemo(() => {
    if (!data) return [];
    return data.map((ad: any) => ({
      id: ad.id,
      imageUrl: ad.images?.find((img: any) => img.is_primary)?.image || ad.images?.[0]?.image,
      price: `€${parseFloat(ad.rent).toLocaleString()}`,
      frequency: "/month CC",
      title: ad.title,
      location: `${ad.city}, ${ad.postal_code}`,
      details: {
        furniture: ad.furnished,
        rooms: ad.rooms.toString(),
        area: `${ad.surface_sqm} m2`,
      },
    }));
  }, [data]);

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
            <h3 className="text-xl font-semibold text-red-600">Failed to load apartments</h3>
            <p className="text-gray-500 mt-2">Please try again later or modify your search.</p>
          </div>
        ) : apartments.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl relative -top-15">
            <h3 className="text-xl font-semibold text-[#061251]">No apartments found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters to find more properties.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 relative -top-15 lg:grid-cols-3">
            {apartments.slice(0, visibleCount).map((apartment: any) => (
              <ApartmentCard key={apartment.id} apartment={apartment} />
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
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
