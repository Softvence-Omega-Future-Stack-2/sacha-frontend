// import { Heart, MapPin } from 'lucide-react';

// import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import furniture from '../../assets/funiture.png';
// import meter from '../../assets/meter.png';
// import room from '../../assets/room.png';
// import featured1 from '../../assets/featured1.png';
// import featured2 from '../../assets/featured2.png';
// import featured3 from '../../assets/featured3.png';
// import featured4 from '../../assets/featured4.png';
// import featured5 from '../../assets/featured5.png';
// import featured6 from '../../assets/featured6.png';
// import { useNavigate } from "react-router-dom";

// interface Apartment {
//     id: number;
//     image: string;
//     price: number;
//     title: string;
//     location: string;
//     furniture: string;
//     rooms: string;
//     area: string;
//     isFavorite?: boolean;
// }

// const FeaturedApartments: React.FC = () => {
//     const { t } = useTranslation();
//     const [apartments, setApartments] = useState<Apartment[]>([

//         { id: 1, image: featured1, price: 585, title: 'Appartement moderne T3 - Marais', location: 'Malibu, California', furniture: 'Furniture', rooms: 'Rooms', area: '62 m2', isFavorite: false },
//         { id: 2, image: featured2, price: 585, title: 'Appartement moderne T3 - Marais', location: 'Malibu, California', furniture: 'Furniture', rooms: 'Rooms', area: '62 m2', isFavorite: true },
//         { id: 3, image: featured3, price: 585, title: 'Appartement moderne T3 - Marais', location: 'Malibu, California', furniture: 'Furniture', rooms: 'Rooms', area: '62 m2', isFavorite: false },
//         { id: 4, image: featured4, price: 585, title: 'Appartement moderne T3 - Marais', location: 'Malibu, California', furniture: 'Furniture', rooms: 'Rooms', area: '62 m2', isFavorite: false },
//         { id: 5, image: featured5, price: 585, title: 'Appartement moderne T3 - Marais', location: 'Malibu, California', furniture: 'Furniture', rooms: 'Rooms', area: '62 m2', isFavorite: false },
//         { id: 6, image: featured6, price: 585, title: 'Appartement moderne T3 - Marais', location: 'Malibu, California', furniture: 'Furniture', rooms: 'Rooms', area: '62 m2', isFavorite: false },
//     ]);

//     const [toastMessage, setToastMessage] = useState("");

//     const navigate = useNavigate();

//     const handleViewDetails = () => {
//         navigate(`/product-details`);
//     };

//     const toggleFavorite = (id: number) => {
//         const apartment = apartments.find(apt => apt.id === id);
//         const wasFavorite = apartment?.isFavorite;

//         setApartments(apartments.map(apt =>
//             apt.id === id ? { ...apt, isFavorite: !apt.isFavorite } : apt
//         ));

//         setToastMessage(!wasFavorite ? "Saved to Favorites" : "Removed from favorites");

//         setTimeout(() => setToastMessage(""), 2800);
//     };

//     return (
//         <>

//             {toastMessage && (
//                 <div className="fixed inset-0 flex items-start justify-end p-6 pointer-events-none z-[9999]">
//                     <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-7 py-5 rounded-2xl shadow-2xl
//                                     max-w-sm border border-white/20 backdrop-blur-md
//                                     animate-in slide-in-from-top-10 fade-in zoom-in-95 duration-500
//                                     flex items-center gap-3 font-semibold text-lg">
//                         <div className="relative">
//                             <Heart className="w-7 h-7 fill-white animate-ping absolute inset-0 opacity-75" />
//                             <Heart className="w-7 h-7 fill-white relative" />
//                         </div>
//                         <span className="drop-shadow-md">
//                             {toastMessage === "Saved to Favorites" ? "Saved to Favorites" : "Removed from favorites"}
//                         </span>
//                     </div>
//                 </div>
//             )}

//             <div className="max-w-6xl mx-auto bg-white py-16 px-4 sm:px-6 lg:px-8">
//                 <div className="max-w-7xl mx-auto">
//                     {/* Header */}
//                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//                         <div>
//                             <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-[#1a1a4d] mb-2">
//                                 {t('featured.title_prefix')} <span className="italic font-normal larken-font">{t('featured.title_suffix')}</span>
//                             </h1>
//                             <p className="text-base text-[#1a1a4d]">
//                                 {t('featured.subtitle')}
//                             </p>
//                         </div>
//                         <button className="mt-4 sm:mt-0 px-4 py-3 border-2 border-[#0612511A] text-[#1a1a4d] rounded-lg font-normal hover:bg-[#1a1a4d] hover:text-white transition-colors duration-200 text-xs">
//                            {t('featured.view_all')}
//                         </button>
//                     </div>

//                     {/* Apartments Grid */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
//                         {apartments.map((apartment) => (
//                             <div key={apartment.id} className="p-3 bg-[#FBFBFB] rounded-2xl">
//                                 <div className="rounded-2xl transition-shadow duration-300">
//                                     <div className="relative h-64 overflow-hidden group rounded-2xl">
//                                         <img
//                                             src={apartment.image}
//                                             alt={apartment.title}
//                                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                                         />

//                                         <button
//                                             onClick={() => toggleFavorite(apartment.id)}
//                                             className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110
//                                                      cursor-pointer transition-transform duration-200"
//                                         >
//                                             <Heart
//                                                 className={`w-5 h-5 ${apartment.isFavorite
//                                                     ? 'fill-red-500 text-[#ffffff]'
//                                                     : 'text-[#ffffff]'
//                                                     }`}
//                                             />
//                                         </button>
//                                     </div>

//                                     <div className="p-0 mt-6">
//                                         <div className="mb-3">
//                                             <span className="text-3xl font-bold text-[#0d6efd]">
//                                                 €{apartment.price}
//                                             </span>
//                                             <span className="text-sm text-gray-600">{t('featured.month_cc')}</span>
//                                         </div>

//                                         <h3 className="text-lg font-semibold text-[#061251] mb-3">
//                                             {apartment.title}
//                                         </h3>

//                                         <div className="flex items-center gap-2 text-[#061251] mb-4">
//                                             <MapPin className="w-4 h-4" />
//                                             <span className="text-sm">{apartment.location}</span>
//                                         </div>

//                                         <div className="flex items-center gap-4 mb-5 text-[#646492]">
//                                             <div className="flex items-center gap-1.5">
//                                                 <img src={furniture} alt="furniture" className="w-6 h-6" />
//                                                 <span className="text-xs">{apartment.furniture}</span>
//                                             </div>
//                                             <div className="flex items-center gap-1.5">
//                                                 <img src={room} alt="room" className="w-6 h-6" />
//                                                 <span className="text-xs">{apartment.rooms}</span>
//                                             </div>
//                                             <div className="flex items-center gap-1.5">
//                                                 <img src={meter} alt="area" className="w-6 h-6" />
//                                                 <span className="text-xs">{apartment.area}</span>
//                                             </div>
//                                         </div>

//                                         <button onClick={handleViewDetails} className="w-full cursor-pointer py-1.5 border border-[#06125133] text-[#061251] rounded-xl font-medium hover:bg-[#1077FF] hover:text-white transition-colors duration-200">
//                                             {t('featured.view_details')}
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default FeaturedApartments;
import { Heart, MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import furniture from "../../assets/funiture.png";
import meter from "../../assets/meter.png";
import room from "../../assets/room.png";

import { useSearchPropertiesQuery } from "../../redux/featuresAPI/properties/property.api";
import { useToggleFavoriteMutation } from "../../redux/featuresAPI/favourite/favoritesApi";

interface Apartment {
  id: number;
  image: string;
  price: number;
  title: string;
  location: string;
  furniture: string;
  rooms: string;
  area: string;
  isFavorite?: boolean;
}

const FeaturedApartments: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, isLoading } = useSearchPropertiesQuery({});
  const [toggleFavoriteAPI] = useToggleFavoriteMutation();

  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [toastMessage, setToastMessage] = useState("");



  // Load API Data
  useEffect(() => {
    if (data?.results) {
      const formatted = data.results.map((item: any) => ({
        id: item.id,
        image: item.images?.length ? item.images[0] : "/no-image.png",
        price: item.total_rent,
        title: item.title,
        location: item.address,
        furniture: "Furniture",
        rooms: item.number_of_rooms,
        area: item.surface_area + " m²",
        isFavorite: item.is_favorited,
      }));
      setApartments(formatted);
    }
  }, [data]);

  console.log(data)

  const handleViewDetails = () => {
    navigate(`/product-details`);
  };

  // Favorite Toggle Handler
  const toggleFavorite = async (id: number) => {
    try {
      const res = await toggleFavoriteAPI(id).unwrap();

      setApartments((prev) =>
        prev.map((apt) =>
          apt.id === id ? { ...apt, isFavorite: res.is_favorited } : apt
        )
      );

      setToastMessage(
        res.is_favorited ? "Saved to Favorites" : "Removed from favorites"
      );

      setTimeout(() => setToastMessage(""), 2500);
    } catch (error) {
      console.error("Toggle favorite failed:", error);
    }
  };

  if (isLoading) {
    return <p className="text-center py-20 text-gray-500">Loading...</p>;
  }

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
                {t("featured.title_prefix")}{" "}
                <span className="italic font-normal larken-font">
                  {t("featured.title_suffix")}
                </span>
              </h1>
              <p className="text-base text-[#1a1a4d]">
                {t("featured.subtitle")}
              </p>
            </div>

            <button className="mt-4 sm:mt-0 px-4 py-3 border-2 border-[#0612511A] text-[#1a1a4d] rounded-lg font-normal hover:bg-[#1a1a4d] hover:text-white transition-colors duration-200 text-xs">
              {t("featured.view_all")}
            </button>
          </div>

          {/* Apartments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
            {apartments.map((apartment) => (
              <div
                key={apartment.id}
                className="p-3 bg-[#FBFBFB] rounded-2xl h-full"
              >
                <div className="rounded-2xl flex flex-col h-full">
                  {/* FIXED IMAGE HEIGHT */}
                  <div className="relative h-[260px] overflow-hidden rounded-2xl group">
                    <img
                      src={apartment.image}
                      alt={apartment.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(apartment.id)}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Heart
                        className={`w-5 h-5 ${apartment.isFavorite
                          ? "fill-red-500 text-white"
                          : "text-white"
                          }`}
                      />
                    </button>
                  </div>

                  {/* FIXED BODY HEIGHT */}
                  <div className="p-0 mt-6 flex flex-col">
                    {/* Price */}
                    <div className="mb-3">
                      <span className="text-3xl font-bold text-[#0d6efd]">
                        €{apartment.price}
                      </span>
                      <span className="text-sm text-gray-600">
                        {t("featured.month_cc")}
                      </span>
                    </div>

                    {/* Title (Clamp 2 lines + fixed height) */}
                    <h3 className="text-lg font-semibold text-[#061251] mb-3 line-clamp-2 min-h-[56px]">
                      {apartment.title}
                    </h3>

                    {/* Location (truncate + fixed height) */}
                    <div className="flex items-center gap-2 text-[#061251] mb-4 min-h-[24px]">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm truncate max-w-[200px]">
                        {apartment.location}
                      </span>
                    </div>

                    {/* Features (fixed height) */}
                    <div className="flex items-center gap-4 mb-5 text-[#646492] min-h-[40px]">
                      <div className="flex items-center gap-1.5">
                        <img src={furniture} className="w-6 h-6" />
                        <span className="text-xs">{apartment.furniture}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <img src={room} className="w-6 h-6" />
                        <span className="text-xs">{apartment.rooms}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <img src={meter} className="w-6 h-6" />
                        <span className="text-xs">{apartment.area}</span>
                      </div>
                    </div>

                    {/* Button pinned at bottom */}
                    <button
                      onClick={handleViewDetails}
                      className="w-full cursor-pointer py-1.5 border border-[#06125133] text-[#061251] 
                      rounded-xl font-medium hover:bg-[#1077FF] hover:text-white transition-colors"
                    >
                      {t("featured.view_details")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedApartments;
