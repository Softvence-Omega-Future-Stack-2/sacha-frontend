import React, { useState } from "react";
import { Heart, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PropertyCardProps {
  id: string;
  price: string;
  title: string;
  location: string;
  image: string;
  onRemove: (id: string) => void;
}

const CardFavoritesPages: React.FC<PropertyCardProps> = ({
  id,
  price,
  title,
  location,
  image,
  onRemove,
}) => {
  const [toastMessage, setToastMessage] = useState<"Removed" | "">("");
  const navigate = useNavigate();

  const handleFavorite = () => {
    onRemove(id);
    setToastMessage("Removed");
    setTimeout(() => setToastMessage(""), 2600);
  };

  const handleViewDetails = () => {
    navigate(`/product-details`);
  };
  console.log(id);

  return (
    <>
      {/* TOAST */}
      {toastMessage && (
        <div className="fixed inset-0 flex items-start justify-end p-6 pointer-events-none z-[9999]">
          <div
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-7 py-5 rounded-2xl shadow-2xl 
                       max-w-sm border border-white/20 backdrop-blur-md
                       animate-in slide-in-from-top-10 fade-in zoom-in-95 duration-500
                       flex items-center gap-3 font-semibold text-lg"
          >
            <div className="relative">
              <Heart className="w-7 h-7 fill-white animate-ping absolute inset-0 opacity-75" />
              <Heart className="w-7 h-7 fill-white relative" />
            </div>
            <span className="drop-shadow-md">Removed from favorites</span>
          </div>
        </div>
      )}

      {/* MAIN CARD */}
      <div className="group p-3 relative bg-[#FBFBFB] rounded-xl transition-all duration-500 hover:shadow hover:bg-white overflow-hidden w-full max-w-sm mx-auto">
        {/* IMAGE */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-cover rounded-lg hover:scale-110 transition-transform duration-700"
          />

          {/* HEART REMOVE BUTTON */}
          <button
            onClick={handleFavorite}
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110
                       cursor-pointer transition-transform duration-200"
          >
            <Heart className="w-5 h-5 fill-red-500 text-white" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="space-y-4">
          {/* PRICE */}
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-blue-600">
              €{price}
              <span className="text-sm font-normal text-gray-500">/month</span>
              <span className="text-xs text-gray-400 ml-1">CC</span>
            </p>
          </div>

          {/* TITLE */}
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors">
            {title}
          </h3>

          {/* LOCATION */}
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{location}</span>
          </div>

          {/* VIEW DETAILS BUTTON */}
          <button
            onClick={handleViewDetails}
            className="w-full mt-6 py-3.5 cursor-pointer rounded-2xl font-medium text-base transition-all duration-300
                       border border-gray-300 text-gray-700
                       hover:bg-blue-600 hover:border-blue-600 hover:text-white"
          >
            View Details
          </button>
        </div>
      </div>
    </>
  );
};

export default CardFavoritesPages;
