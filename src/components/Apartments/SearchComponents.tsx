

import { useState } from "react";
import type { FC, ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// --- Icon Components ---
const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-blue-500"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400 pointer-events-none"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

// --- Custom Select ---
// --- Custom Select Types ---
interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  icon?: ReactNode;
  isLocation?: boolean;
}

const CustomSelect: FC<CustomSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  icon,
  isLocation = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div className="w-full bg-white rounded-xl top-2 relative transition-all duration-300">
        <div className="p-3">
          <label className="text-sm text-gray-500 block mb-1 font-medium">
            {label}
          </label>

          {/* Trigger Area */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex items-center cursor-pointer select-none"
          >
            {icon && <span className="mr-2 flex-shrink-0">{icon}</span>}

            <span
              className={`flex-1 text-gray-800 font-semibold truncate ${!value ? "text-gray-400 font-normal" : ""
                }`}
            >
              {value || placeholder}
            </span>

            {!isLocation && (
              <span
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 transition-transform duration-200 pointer-events-none ${isOpen ? "rotate-180" : ""
                  }`}
              >
                <ChevronDownIcon />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="px-4 py-3 text-gray-800 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all duration-150 first:rounded-t-xl last:rounded-b-xl font-medium"
              >
                {option}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// --- MAIN Search Component Types ---
interface ApartmentSearchProps {
  onSearch?: () => void;
}

const ApartmentSearch: FC<ApartmentSearchProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [propertyType, setPropertyType] = useState<string>(searchParams.get("property_type") || "");
  const [location, setLocation] = useState<string>(searchParams.get("location") || "");
  const [priceRange, setPriceRange] = useState<string>(searchParams.get("price_range") || "");
  const [rentalType, setRentalType] = useState<string>(searchParams.get("rental_type") || "");
  const [rooms, setRooms] = useState<string>(searchParams.get("rooms") || "");

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    navigate(`/apartments?${params.toString()}`);
  };

  const handleReset = () => {
    setPropertyType("");
    setLocation("");
    setPriceRange("");
    setRentalType("");
    setRooms("");
    navigate("/apartments");
    onSearch?.();
  };

  return (
    <div className="w-full relative -top-11 lg:-top-14 mb-2">
      <div className="w-full bg-[#F0F5FF] p-4 sm:p-6 rounded-2xl flex flex-col lg:flex-row gap-4 items-center">
        {/* Property Type */}
        <CustomSelect
          label="Property type"
          value={propertyType}
          onChange={(val) => {
            setPropertyType(val);
            updateFilters("property_type", val);
          }}
          options={[
            "Appartement",
            "Maison",
            "Condo",
            "Townhouse",
            "Studio",
            "Penthouse",
          ]}
          placeholder="Select type" icon={undefined} />

        {/* Location */}
        <div className="relative w-full">
          <div className="w-full bg-white rounded-xl top-2 relative transition-all duration-300">
            <div className="p-3">
              <label className="text-sm text-gray-500 block mb-1 font-medium">
                Emplacement
              </label>

              <div className="relative flex items-center">
                <span className="mr-2 flex-shrink-0">
                  <LocationIcon />
                </span>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    updateFilters("location", e.target.value);
                  }}
                  placeholder="Enter location"
                  className="flex-1 bg-transparent outline-none text-gray-800 font-semibold placeholder-gray-400 truncate"
                  style={{ minWidth: 0 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Price Range */}
        <CustomSelect
          label="Gamme de prix"
          value={priceRange}
          onChange={(val) => {
            setPriceRange(val);
            updateFilters("price_range", val);
          }}
          options={[
            "€500 - €1,000",
            "€1,000 - €2,000",
            "€2,000 - €5,000",
            "Over €5,000",
          ]}
          placeholder="N'importe quel prix" icon={undefined} />

        {/* Rental Type */}
        <CustomSelect
          label="Type de location"
          value={rentalType}
          onChange={(val) => {
            setRentalType(val);
            updateFilters("rental_type", val);
          }}
          options={["Meublé", "Non meublé"]}
          placeholder="N'importe quel" icon={undefined} />

        {/* Rooms */}
        <CustomSelect
          label="Chambres"
          value={rooms}
          onChange={(val) => {
            setRooms(val);
            updateFilters("rooms", val);
          }}
          options={["1+", "2+", "3+", "4+", "5+"]}
          placeholder="N'importe quel" icon={undefined} />

        {/* Reset Filters */}
        <button
          onClick={handleReset}
          className="w-full lg:w-auto px-10 py-6 mt-3 bg-blue-600 text-white font-bold text-sm uppercase rounded-xl hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-lg whitespace-nowrap"
        >
          Réinitialiser les filtres
        </button>
      </div>
    </div>
  );
};

export default ApartmentSearch;
