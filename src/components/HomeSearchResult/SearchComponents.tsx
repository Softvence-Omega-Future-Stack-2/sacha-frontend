// import { useState } from "react";

// // --- Icon Components ---
// const LocationIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-5 w-5 text-blue-500"
//     viewBox="0 0 20 20"
//     fill="currentColor"
//   >
//     <path
//       fillRule="evenodd"
//       d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
//       clipRule="evenodd"
//     />
//   </svg>
// );

// const ChevronDownIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-5 w-5 text-gray-400 pointer-events-none"
//     viewBox="0 0 20 20"
//     fill="currentColor"
//   >
//     <path
//       fillRule="evenodd"
//       d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//       clipRule="evenodd"
//     />
//   </svg>
// );

// // --- Professional Manual Custom Select (No <select> at all) ---
// const CustomSelect = ({
//   label,
//   value,
//   onChange,
//   options,
//   placeholder,
//   icon,
//   isLocation = false,
// }: {
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
//   options: string[];
//   placeholder: string;
//   icon?: React.ReactNode;
//   isLocation?: boolean;
// }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="relative w-full">
//       <div className="w-full bg-white rounded-xl top-2 relative transition-all duration-300">
//         <div className="p-3">
//           <label className="text-sm text-gray-500 block mb-1 font-medium">
//             {label}
//           </label>

//           {/* Trigger Area */}
//           <div
//             onClick={() => setIsOpen(!isOpen)}
//             className="relative flex items-center cursor-pointer select-none"
//           >
//             {/* Icon */}
//             {icon && <span className="mr-2 flex-shrink-0">{icon}</span>}

//             {/* Selected Value / Placeholder */}
//             <span
//               className={`flex-1 text-gray-800 font-semibold truncate ${
//                 !value ? "text-gray-400 font-normal" : ""
//               }`}
//             >
//               {value || placeholder}
//             </span>

//             {/* Chevron (only for non-location fields) */}
//             {!isLocation && (
//               <span
//                 className={`absolute right-0 top-1/2 transform -translate-y-1/2 transition-transform duration-200 pointer-events-none ${
//                   isOpen ? "rotate-180" : ""
//                 }`}
//               >
//                 <ChevronDownIcon />
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Dropdown Menu */}
//       {isOpen && (
//         <>
//           <div
//             className="fixed inset-0 z-40"
//             onClick={() => setIsOpen(false)}
//           />
//           <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
//             {options.map((option) => (
//               <div
//                 key={option}
//                 onClick={() => {
//                   onChange(option);
//                   setIsOpen(false);
//                 }}
//                 className="px-4 py-3 text-gray-800 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all duration-150 first:rounded-t-xl last:rounded-b-xl font-medium"
//               >
//                 {option}
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// // --- Main Apartment Search Component ---
// const ApartmentSearch = ({
//   onSearch = () => alert("Searching..."),
// }: {
//   onSearch?: () => void;
// }) => {
//   const [propertyType, setPropertyType] = useState("");
//   const [location, setLocation] = useState("Dhanmondi, Dhaka");
//   const [priceRange, setPriceRange] = useState("€10,000 - €200,000");

//   return (
//     <div className="w-full relative -top-11 lg:-top-14 mb-2">
//       <div className="w-full bg-[#F0F5FF] p-4 sm:p-6 rounded-2xl flex flex-col lg:flex-row gap-4 items-center">
//         {/* Property Type */}
//         <CustomSelect
//           label="Property type"
//           value={propertyType}
//           onChange={setPropertyType}
//           options={[
//             "Apartment",
//             "House",
//             "Condo",
//             "Townhouse",
//             "Studio",
//             "Penthouse",
//           ]}
//           placeholder="Select type"
//         />

//         {/* Location - এখন টাইপ করা যায় (কিন্তু লুক ১০০% একই) */}
//         <div className="relative w-full">
//           <div className="w-full bg-white rounded-xl top-2 relative transition-all duration-300">
//             <div className="p-3">
//               <label className="text-sm text-gray-500 block mb-1 font-medium">
//                 Location
//               </label>

//               <div className="relative flex items-center">
//                 <span className="mr-2 flex-shrink-0">
//                   <LocationIcon />
//                 </span>

//                 <input
//                   type="text"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   placeholder="Enter location"
//                   className="flex-1 bg-transparent outline-none text-gray-800 font-semibold placeholder-gray-400 truncate"
//                   style={{ minWidth: 0 }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Price Range */}
//         <CustomSelect
//           label="Price Range"
//           value={priceRange}
//           onChange={setPriceRange}
//           options={[
//             "€10,000 - €200,000",
//             "€200,001 - €500,000",
//             "€500,001 - €1,000,000",
//             "€1,000,001 - €2,000,000",
//             "Over €2,000,000",
//           ]}
//           placeholder="Any price"
//         />

//         {/* Search Button */}
//         <button
//           onClick={onSearch}
//           className="w-full lg:w-auto px-10 py-5 bg-blue-600 text-white font-bold text-sm uppercase rounded-xl hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-lg whitespace-nowrap"
//         >
//           Modify Search
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ApartmentSearch;

import { useState } from "react";
import type { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

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
            {options.map((option: string) => (
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

  const [propertyType, setPropertyType] = useState<string>("");
  const [location, setLocation] = useState<string>("Dhanmondi, Dhaka");
  const [priceRange, setPriceRange] = useState<string>("€10,000 - €200,000");

  // 🔥 Modify Button → Navigate with Query Params
  const handleModifySearch = () => {
    const query = new URLSearchParams({
      property_type: propertyType,
      location: location,
      price_range: priceRange,
    }).toString();

    navigate(`/apartments?${query}`);
    onSearch?.(); // existing functionality intact
  };

  return (
    <div className="w-full relative -top-11 lg:-top-14 mb-2">
      <div className="w-full bg-[#F0F5FF] p-4 sm:p-6 rounded-2xl flex flex-col lg:flex-row gap-4 items-center">
        {/* Property Type */}
        <CustomSelect
          label="Property type"
          value={propertyType}
          onChange={setPropertyType}
          options={[
            "Apartment",
            "House",
            "Condo",
            "Townhouse",
            "Studio",
            "Penthouse",
          ]}
          placeholder="Select type"
          icon={undefined}
        />

        {/* Location */}
        <div className="relative w-full">
          <div className="w-full bg-white rounded-xl top-2 relative transition-all duration-300">
            <div className="p-3">
              <label className="text-sm text-gray-500 block mb-1 font-medium">
                Location
              </label>

              <div className="relative flex items-center">
                <span className="mr-2 flex-shrink-0">
                  <LocationIcon />
                </span>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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
          label="Price Range"
          value={priceRange}
          onChange={setPriceRange}
          options={[
            "€10,000 - €200,000",
            "€200,001 - €500,000",
            "€500,001 - €1,000,000",
            "€1,000,001 - €2,000,000",
            "Over €2,000,000",
          ]}
          placeholder="Any price"
          icon={undefined}
        />

        {/* Modify Search */}
        <button
          onClick={handleModifySearch}
          className="w-full lg:w-auto px-10 py-5 bg-blue-600 text-white font-bold text-sm uppercase rounded-xl hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-lg whitespace-nowrap"
        >
          Modify Search
        </button>
      </div>
    </div>
  );
};

export default ApartmentSearch;
