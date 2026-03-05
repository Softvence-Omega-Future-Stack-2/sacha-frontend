import { Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import SVGs as regular image URLs
import locationIcon from "../../assets/appartment/marker-pin-01.svg";
import furnitureIcon from "../../assets/appartment/solar_sofa-linear.svg";
import roomIcon from "../../assets/appartment/fluent-mdl2_room.svg";
import scaleIcon from "../../assets/appartment/scale-01.svg";

const ApartmentCard = ({ apartment }: { apartment: any }) => {
  const { price, frequency, title, location, details } = apartment;

  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleFavorite = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    setMessage(newState ? "Saved successfully!" : "Removed from favorites.");

    // Auto hide toast after 2.5 seconds
    setTimeout(() => setMessage(""), 2500);
  };

  const handleViewDetails = () => {
    navigate(`/apartments/product-details/${apartment.id}`);
  };

  // Simple Detail Item using <img />
  const DetailItem = ({ src, alt, text }: { src: string; alt: string; text: string }) => (
    <div className="flex items-center text-xs text-gray-500">
      <img src={src} alt={alt} className="w-5 h-5 mr-1" />
      <span>{text}</span>
    </div>
  );

  return (
    <div className="relative top-5 bg-[#FBFBFB] p-2 rounded-xl transition duration-300 overflow-hidden border border-gray-100">

      {/* Beautiful Toast Notification - Only Change Here */}
      {/* Super Smooth & Beautiful Toast with Animation */}
      {message && (
        <div className="fixed inset-0 flex items-start justify-end p-6 pointer-events-none z-[9999]">
          <div
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-7 py-5 rounded-2xl shadow-2xl 
                 max-w-sm border border-white/20 backdrop-blur-md
                 animate-in slide-in-from-top-10 fade-in zoom-in-95 duration-500
                 flex items-center gap-3 font-semibold text-lg"
          >
            <div className="relative">
              <Heart className="w-7 h-7 fill-white animate-ping absolute inset-0" />
              <Heart className="w-7 h-7 fill-white relative" />
            </div>
            <span className="drop-shadow-md">
              {message === "Saved successfully!" ? "Saved to Favorites" : "Removed from favorites"}
            </span>
          </div>
        </div>
      )}

      {/* Image */}
      <div className="relative h-48">
        <img
          src={apartment.imageUrl || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=400"}
          alt={title}
          className="h-full w-full rounded-lg object-cover"
        />

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 cursor-pointer transition-transform duration-200 shadow-md"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${isFavorite
              ? "fill-red-500 text-red-500"
              : "text-gray-700"
              }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <p className="text-xl font-bold text-[#1077FF]">
          {price}
          <span className="text-sm font-light text-gray-500"> {frequency}</span>
        </p>

        {/* Title */}
        <h3 className="mt-1 text-lg font-medium text-gray-800 mb-2 line-clamp-1">
          {title}
        </h3>

        {/* Location */}
        <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <img src={locationIcon} alt="Location" className="w-5 h-5 flex-shrink-0" />
          <span className="truncate">{location}</span>
        </p>

        {/* Details */}
        <div className="flex justify-start gap-6 pb-4 mb-4">
          <DetailItem src={furnitureIcon} alt="Furniture" text="Furnished" />
          <DetailItem src={roomIcon} alt="Rooms" text={`${details?.rooms} Rooms`} />
          <DetailItem src={scaleIcon} alt="Area" text={`${details?.area}`} />
        </div>

        {/* View Details Button */}
        <button
          onClick={handleViewDetails}
          className="w-full py-3 font-semibold rounded-lg border border-[rgba(6,18,81,0.20)] text-gray-700 hover:bg-[#1077FF] hover:text-white hover:border-[#1077FF] transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ApartmentCard;