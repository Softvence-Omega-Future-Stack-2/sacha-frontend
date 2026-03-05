// import Title from "../Title";
// import { useState } from "react";
// import CardFavoritesPages from "./Card";
// import toast, { Toaster } from "react-hot-toast";

// const properties = [
//   {
//     id: "1",
//     price: "585",
//     title: "Test",
//     location: "Malibu, California",
//     image: "/src/assets/dashboard/h1.jpg",
//   },
//   {
//     id: "2",
//     price: "585",
//     title: "Appartement moderne T8 – Marais",
//     location: "Malibu, California",
//     image: "/src/assets/dashboard/h2.jpg",
//   },
//   {
//     id: "3",
//     price: "855",
//     title: "Appartement moderne T3 - Marais",
//     location: "Harbor City, Sydney",
//     image: "/src/assets/dashboard/h3.jpg",
//   },
//   {
//     id: "4",
//     price: "589",
//     title: "Appartement moderne T2 – Marais",
//     location: "Malibu, California",
//     image: "/src/assets/dashboard/h4.jpg",
//   },
//   {
//     id: "5",
//     price: "581",
//     title: "Appartement moderne T13 – Marais",
//     location: "Malibu, California",
//     image: "/src/assets/dashboard/h5.jpg",
//   },
//   {
//     id: "6",
//     price: "580",
//     title: "Appartement moderne T11 – Marais",
//     location: "Manhattan, NYC",
//     image: "/src/assets/dashboard/h6.jpg",
//   },
//   {
//     id: "7",
//     price: "585",
//     title: "Appartement moderne T10 – Marais",
//     location: "Times Square, NYC",
//     image: "/src/assets/dashboard/h1.jpg",
//   },
//   {
//     id: "8",
//     price: "585",
//     title: "Appartement moderne T17 – Marais",
//     location: "Downtown, Sydney",
//     image: "/src/assets/dashboard/h2.jpg",
//   },
//   {
//     id: "9",
//     price: "585",
//     title: "Appartement moderne T18 – Marais",
//     location: "Malibu, California",
//     image: "/src/assets/dashboard/h2.jpg",
//   },
//   {
//     id: "10",
//     price: "585",
//     title: "Appartement moderne T9 – Marais",
//     location: "Malibu, California",
//     image: "/src/assets/dashboard/h4.jpg",
//   },
//   {
//     id: "11",
//     price: "585",
//     title: "Appartement moderne T5 – Marais",
//     location: "Malibu, California",
//     image: "/src/assets/dashboard/h5.jpg",
//   },
//   {
//     id: "12",
//     price: "585",
//     title: "Appartement moderne T15 – Marais",
//     location: "Malibu, California",
//     image: "/src/assets/dashboard/h6.jpg",
//   },
//   {
//     id: "13",
//     price: "585",
//     title: "Appartement moderne T17 – Marais",
//     location: "Malibu, California",
//     image: "/src/assets/dashboard/h1.jpg",
//   },
//   {
//     id: "14",
//     price: "585",
//     title: "Appartement moderne T14 – Marais",
//     location: "Malibu, California",
//     image: "/src/assets/dashboard/h2.jpg",
//   },
// ];

// const ITEMS_PER_PAGE = 8;

// const FavoritesPages: React.FC = () => {
//   const [favorites, setFavorites] = useState(properties); // এখন favorites state আছে
//   const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
//   const [loading, setLoading] = useState(false);

//   const visibleProperties = favorites.slice(0, visibleCount);
//   const hasMore = visibleCount < favorites.length;

//   const handleRemove = (id: string) => {
//     setFavorites((prev) => prev.filter((item) => item.id !== id));
//     toast.success("Removed from favorites", {
//       duration: 2000,
//       position: "top-center",
//       style: { background: "#333", color: "#fff", fontSize: "14px" },
//     });
//   };

//   const handleViewMore = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setVisibleCount((prev) =>
//         Math.min(prev + ITEMS_PER_PAGE, favorites.length)
//       );
//       setLoading(false);
//       window.scrollBy({ top: 300, behavior: "smooth" });
//     }, 400);
//   };

//   return (
//     <div className="bg-white">
//       <Toaster />

//       <div>
//         {/* Header */}
//         <header className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6">
//           <Title
//             title="My Favorites"
//             paragraph="Manage your assets and applications in the blink of an eye"
//           />
//         </header>

//         {/* Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {visibleProperties.map((property) => (
//             <CardFavoritesPages
//               key={property.id}
//               id={property.id}
//               price={property.price}
//               title={property.title}
//               location={property.location}
//               image={property.image}
//               onRemove={handleRemove}
//             />
//           ))}
//         </div>

//         {/* View More Button / Loader */}
//         {hasMore && (
//           <div className="flex justify-center pb-12">
//             {loading ? (
//               <div className="py-8 text-center">
//                 <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
//                 <p className="text-sm text-gray-500 mt-3">Loading more...</p>
//               </div>
//             ) : (
//               <button
//                 onClick={handleViewMore}
//                 className="px-10 py-4 bg-white border mt-4 cursor-pointer border-[#646492] rounded-xl text-sm font-bold text-[#061251] uppercase tracking-wider hover:border-gray-400 transition-all duration-200"
//               >
//                 View More
//               </button>
//             )}
//           </div>
//         )}

//         {favorites.length === 0 && (
//           <div className="text-center py-20 text-gray-500">
//             <p className="text-lg">No favorite properties yet.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FavoritesPages;

//
// import Title from "../Title";
// import { useState, useEffect } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import {
//   useGetFavoritesQuery,
//   useToggleFavoriteMutation,
// } from "../../../../redux/featuresAPI/favourite/favoritesApi";

// const ITEMS_PER_PAGE = 8;

// const FavoritesPages: React.FC = () => {
//   const { data, isLoading: isFavoritesLoading } = useGetFavoritesQuery();
//   const [toggleFavorite] = useToggleFavoriteMutation();

//   const [favorites, setFavorites] = useState<any[]>([]);
//   const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (data?.results) {
//       const formatted = data.results.map((item: any) => {
//         const p = item.property_details;
//         return {
//           id: p.id,
//           price: p.total_rent,
//           title: p.title,
//           location: p.address,
//           image: p.images?.length ? p.images[0] : "/no-image.png",
//           isFavorite: p.is_favorited,
//         };
//       });
//       setFavorites(formatted);
//     }
//   }, [data]);

//   const visibleProperties = favorites.slice(0, visibleCount);
//   const hasMore = visibleCount < favorites.length;

//   const handleRemove = async (id: number) => {
//     try {
//       const res = await toggleFavorite(id).unwrap();

//       setFavorites((prev) => prev.filter((item) => item.id !== id));

//       toast.success(
//         res.is_favorited ? "Saved to Favorites" : "Removed from favorites",
//         {
//           duration: 2000,
//           position: "top-center",
//           style: { background: "#333", color: "#fff" },
//         }
//       );
//     } catch (error) {
//       toast.error("Failed to update favorite");
//     }
//   };

//   const handleViewMore = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setVisibleCount((prev) =>
//         Math.min(prev + ITEMS_PER_PAGE, favorites.length)
//       );
//       setLoading(false);
//       window.scrollBy({ top: 300, behavior: "smooth" });
//     }, 400);
//   };

//   return (
//     <div className="bg-white">
//       <Toaster />

//       <header className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6">
//         <Title
//           title="My Favorites"
//           paragraph="Manage your assets and applications in the blink of an eye"
//         />
//       </header>

//       {isFavoritesLoading ? (
//         <div className="text-center py-20 text-gray-500">Loading...</div>
//       ) : (
//         <>
//           {/* UPDATED CARD UI */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {visibleProperties.map((property) => (
//               <div
//                 key={property.id}
//                 className="bg-white rounded-[24px] p-4 shadow-sm border border-[#E8E9F1] h-full flex flex-col"
//               >
//                 {/* FIXED IMAGE WRAPPER - EXACT SAME AS UI */}
//                 <div className="relative h-[230px] rounded-[20px] overflow-hidden bg-[#F4F5F7]">
//                   <img
//                     src={property.image}
//                     alt={property.title}
//                     className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
//                   />

//                   {/* HEART BUTTON EXACT STYLE + POSITION */}
//                   <button
//                     onClick={() => handleRemove(property.id)}
//                     className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition"
//                   >
//                     <span className="text-red-500 text-lg">♥</span>
//                   </button>
//                 </div>

//                 {/* BODY EXACTLY MATCHED */}
//                 <div className="mt-6 flex flex-col flex-grow">
//                   {/* PRICE EXACT STYLE */}
//                   <div className="flex items-end gap-1 mb-3">
//                     <span className="text-[28px] font-bold text-[#0d6efd] leading-none">
//                       €{property.price}
//                     </span>
//                     <span className="text-[12px] text-gray-500 mb-1">
//                       /month cc
//                     </span>
//                   </div>

//                   {/* TITLE EXACT SPACING + STYLE */}
//                   <h3 className="text-[16px] font-semibold text-[#061251] leading-snug mb-3 line-clamp-2 min-h-[48px]">
//                     {property.title}
//                   </h3>

//                   {/* LOCATION EXACT ROW */}
//                   <div className="flex items-center gap-2 text-[#061251] mb-4">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-[16px] w-[16px]"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M5.05 4.05a7 7 0 119.9 9.9l-4.243 4.242a1 1 0 01-1.414 0L5.05 13.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     <span className="text-sm text-[#061251] truncate max-w-[180px]">
//                       {property.location}
//                     </span>
//                   </div>

//                   {/* BUTTON EXACT MATCH */}
//                   <button className="mt-auto w-full py-3 text-[15px] font-medium border rounded-xl border-[#D8DCE6] text-[#061251] hover:bg-[#0d6efd] hover:text-white transition">
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {hasMore && (
//             <div className="flex justify-center pb-12">
//               {loading ? (
//                 <div className="py-8 text-center">
//                   <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
//                   <p className="text-sm text-gray-500 mt-3">Loading more...</p>
//                 </div>
//               ) : (
//                 <button
//                   onClick={handleViewMore}
//                   className="px-10 py-4 bg-white border mt-4 cursor-pointer border-[#646492] rounded-xl text-sm font-bold text-[#061251] uppercase tracking-wider hover:border-gray-400 transition-all duration-200"
//                 >
//                   View More
//                 </button>
//               )}
//             </div>
//           )}

//           {favorites.length === 0 && (
//             <div className="text-center py-20 text-gray-500">
//               <p className="text-lg">No favorite properties yet.</p>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default FavoritesPages;

import Title from "../Title";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  useGetFavoritesQuery,
  useToggleFavoriteMutation,
} from "../../../../redux/featuresAPI/favourite/favoritesApi";
import CardFavoritesPages from "./Card";

const ITEMS_PER_PAGE = 8;

const FavoritesPages: React.FC = () => {
  const { data, isLoading: isFavoritesLoading } =
    useGetFavoritesQuery(undefined);
  const [toggleFavorite] = useToggleFavoriteMutation();

  const [favorites, setFavorites] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(false);

  // FORMAT API → UI
  useEffect(() => {
    if (data?.results) {
      const formatted = data.results.map((item: any) => {
        const p = item.property_details;
        return {
          id: p.id.toString(),
          price: p.total_rent,
          title: p.title,
          location: p.address,
          image: p.images?.length ? p.images[0] : "/no-image.png",
          isFavorite: p.is_favorited,
        };
      });
      setFavorites(formatted);
    }
  }, [data]);

  const visibleProperties = favorites.slice(0, visibleCount);
  const hasMore = visibleCount < favorites.length;

  // REMOVE FROM FAVORITE
  const handleRemove = async (id: string) => {
    try {
      const res = await toggleFavorite(Number(id)).unwrap();

      setFavorites((prev) => prev.filter((item) => item.id !== id));

      toast.success(
        res.is_favorited ? "Saved to Favorites" : "Removed from favorites",
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
