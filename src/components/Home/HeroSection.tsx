// import { ChevronDown, MapPin } from "lucide-react";
// import bgImg from "../../assets/hero-background.png";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import "../../App.css";
// const HeroSection: React.FC = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const clickAppertmentButton = () => navigate("/apartments");
//   const clickOwnerButton = () => navigate("/rental");

//   useEffect(() => {
//     const checkLoginStatus = () => {
//       const loggedIn = localStorage.getItem("isLoggedIn") === "true";
//       setIsLoggedIn(loggedIn);
//     };

//     checkLoginStatus();
//     window.addEventListener("storage", checkLoginStatus);

//     return () => window.removeEventListener("storage", checkLoginStatus);
//   }, []);

//   const userRole =
//     typeof window !== "undefined"
//       ? localStorage.getItem("detectedRole") || "tenant"
//       : "owner";

//   // Custom Dropdown States
//   const [propertyOpen, setPropertyOpen] = useState(false);
//   const [selectedProperty, setSelectedProperty] = useState(
//     t("search.property_type_placeholder")
//   );

//   const [priceOpen, setPriceOpen] = useState(false);
//   const [selectedPrice, setSelectedPrice] = useState(
//     t("search.price_range_placeholder")
//   );

//   const propertyOptions = [
//     { value: "", label: t("search.property_type_placeholder") },
//     { value: "studio", label: "Studio / Bachelor" },
//     { value: "apartment", label: "Apartment / Flat" },
//     { value: "condo", label: "Condominium (Condo)" },
//     { value: "house", label: "House / Family Home" },
//     { value: "townhouse", label: "Townhouse" },
//     { value: "villa", label: "Villa / Luxury Estate" },
//   ];

//   const priceOptions = [
//     { value: "", label: t("search.price_range_placeholder") },
//     { value: "0-1000", label: "€0 - €1,000 (Budget)" },
//     { value: "1000-1500", label: "€1,000 - €1,500 (Standard)" },
//     { value: "1500-2000", label: "€1,500 - €2,000 (Mid-Range)" },
//     { value: "2000-3000", label: "€2,000 - €3,000 (Premium)" },
//     { value: "3000-5000", label: "€3,000 - €5,000 (Luxury)" },
//     { value: "5000+", label: "€5,000+ (High-End)" },
//   ];

//   return (
//     <div className="w-full">
//       {/* Hero Section */}
//       <div className="relative min-h-[650px] sm:min-h-[680px] lg:min-h-[750px] rounded-2xl overflow-hidden">
//         {/* Background with Gradient */}
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(16,119,255,0.00)_36.59%,#1077FF_100%)]" />
//           <img
//             src={bgImg}
//             alt="Modern architecture building"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Content Container */}
//         <div className="relative px-4 sm:px-8 lg:px-12 xl:px-20 pt-16 sm:pt-20 lg:pt-28 pb-10 ">
//           <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
//             {/* Left Content */}
//             <div className="text-white space-y-6 lg:space-y-8">
//               <h1 className="text-white font-dm-sans text-3xl  lg:text-6xl font-semibold leading-[120%] tracking-[0.64px] [text-shadow:0_4px_60px_rgba(0,0,0,0.16)]">
//                 {t("hero.title")}{" "}
//                 <span className="larken-font text-white  text-3xl  lg:text-6xl font-normal italic leading-[120%] tracking-[0.64px] ">
//                   {t("hero.title") === "Find your Apartment Quickly"
//                     ? "Apartment Quickly"
//                     : ""}
//                 </span>
//                 {t("hero.subtitle")}
//               </h1>
//               <p className="text-white font-dm-sans text-md lg:text-2xl font-normal leading-[120%] tracking-[0.24px] [text-shadow:0_4px_60px_rgba(0,0,0,0.20)]">
//                 {t("hero.description")}
//               </p>

//               {isLoggedIn ? (
//                 ""
//               ) : (
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <button
//                     onClick={clickAppertmentButton}
//                     className="px-6 py-4 bg-white text-[#1077FF] rounded-xl font-semibold text-sm sm:text-base hover:bg-white/95 transition-colors whitespace-nowrap"
//                   >
//                     {t("hero.our_apartments")}
//                   </button>
//                   <button
//                     onClick={clickOwnerButton}
//                     className="px-6 py-4 border border-white text-white rounded-xl font-semibold text-sm sm:text-base hover:bg-white/10 transition-colors whitespace-nowrap"
//                   >
//                     {t("hero.i_am_owner")}
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Search Form — only show when NOT logged in OR logged in as non-owner */}
//             {
//               !isLoggedIn || userRole !== "owner" ? (
//                 <div className="lg:flex lg:justify-end w-full">
//                   {/* Mobile Version */}
//                   <div className="block lg:hidden mt-10">
//                     <SearchForm
//                       propertyOpen={propertyOpen}
//                       setPropertyOpen={setPropertyOpen}
//                       selectedProperty={selectedProperty}
//                       setSelectedProperty={setSelectedProperty}
//                       propertyOptions={propertyOptions}
//                       priceOpen={priceOpen}
//                       setPriceOpen={setPriceOpen}
//                       selectedPrice={selectedPrice}
//                       setSelectedPrice={setSelectedPrice}
//                       priceOptions={priceOptions}
//                     />
//                   </div>

//                   {/* Desktop Version */}
//                   <div className="hidden lg:block max-w-md w-full">
//                     <SearchForm
//                       propertyOpen={propertyOpen}
//                       setPropertyOpen={setPropertyOpen}
//                       selectedProperty={selectedProperty}
//                       setSelectedProperty={setSelectedProperty}
//                       propertyOptions={propertyOptions}
//                       priceOpen={priceOpen}
//                       setPriceOpen={setPriceOpen}
//                       selectedPrice={selectedPrice}
//                       setSelectedPrice={setSelectedPrice}
//                       priceOptions={priceOptions}
//                     />
//                   </div>
//                 </div>
//               ) : null /* owner hole kichu show korbo na */
//             }
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Search Form Component with Loader + Navigation
// const SearchForm: React.FC<{
//   propertyOpen: boolean;
//   setPropertyOpen: (v: boolean) => void;
//   selectedProperty: string;
//   setSelectedProperty: (v: string) => void;
//   propertyOptions: { value: string; label: string }[];
//   priceOpen: boolean;
//   setPriceOpen: (v: boolean) => void;
//   selectedPrice: string;
//   setSelectedPrice: (v: string) => void;
//   priceOptions: { value: string; label: string }[];
// }> = ({
//   propertyOpen,
//   setPropertyOpen,
//   selectedProperty,
//   setSelectedProperty,
//   propertyOptions,
//   priceOpen,
//   setPriceOpen,
//   selectedPrice,
//   setSelectedPrice,
//   priceOptions,
// }) => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const handleSearch = () => {
//     if (loading) return;
//     setLoading(true);

//     setTimeout(() => {
//       navigate("/search-result");
//     }, 800); // 800ms delay → loader
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-6 lg:p-8">
//       <h3 className="text-gray-900 font-semibold text-lg sm:text-xl mb-5 sm:mb-6">
//         {t("search.find_home")}
//       </h3>

//       {/* Property Type */}
//       <div className="mb-4 relative">
//         <label className="block text-gray-700 text-sm font-semibold mb-2 pl-1">
//           {t("search.property_type")}
//         </label>
//         <button
//           type="button"
//           onClick={() => setPropertyOpen(!propertyOpen)}
//           className="w-full px-4 py-3.5 bg-[#EEF5FD] text-gray-800 font-medium text-sm rounded-xl flex justify-between items-center hover:bg-[#e0effb] transition-all focus:outline-none focus:ring-2 focus:ring-[#1077FF]"
//         >
//           <span className="truncate">{selectedProperty}</span>
//           <ChevronDown
//             className={`w-5 h-5 text-[#1077FF] transition-transform duration-200 flex-shrink-0 ${
//               propertyOpen ? "rotate-180" : ""
//             }`}
//           />
//         </button>

//         {propertyOpen && (
//           <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
//             {propertyOptions.map((opt) => (
//               <button
//                 key={opt.value}
//                 type="button"
//                 onClick={() => {
//                   setSelectedProperty(opt.label);
//                   setPropertyOpen(false);
//                 }}
//                 className="w-full px-4 py-3 text-left text-sm text-gray-800 hover:bg-[#EEF5FD] transition-colors first:rounded-t-xl last:rounded-b-xl"
//               >
//                 {opt.label}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Location */}
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-semibold mb-2 pl-1">
//           {t("search.location")}
//         </label>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder={t("search.location_placeholder")}
//             className="w-full px-4 py-3.5 bg-[#EEF5FD] rounded-xl text-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1077FF]"
//           />
//           <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1077FF]" />
//         </div>
//       </div>

//       {/* Price Range */}
//       <div className="mb-6 relative">
//         <label className="block text-gray-700 text-sm font-semibold mb-2 pl-1">
//           {t("search.price_range")}
//         </label>
//         <button
//           type="button"
//           onClick={() => setPriceOpen(!priceOpen)}
//           className="w-full px-4 py-3.5 bg-[#EEF5FD] text-gray-800 font-medium text-sm rounded-xl flex justify-between items-center hover:bg-[#e0effb] transition-all focus:outline-none focus:ring-2 focus:ring-[#1077FF]"
//         >
//           <span className="truncate">{selectedPrice}</span>
//           <ChevronDown
//             className={`w-5 h-5 text-[#1077FF] transition-transform duration-200 flex-shrink-0 ${
//               priceOpen ? "rotate-180" : ""
//             }`}
//           />
//         </button>

//         {priceOpen && (
//           <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
//             {priceOptions.map((opt) => (
//               <button
//                 key={opt.value}
//                 type="button"
//                 onClick={() => {
//                   setSelectedPrice(opt.label);
//                   setPriceOpen(false);
//                 }}
//                 className="w-full px-4 py-3 text-left text-sm text-gray-800 hover:bg-[#EEF5FD] transition-colors first:rounded-t-xl last:rounded-b-xl"
//               >
//                 {opt.label}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Search Button with Loader */}
//       <button
//         onClick={handleSearch}
//         disabled={loading}
//         className={`w-full py-4 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-3 ${
//           loading
//             ? "bg-[#0d63db] text-white cursor-not-allowed"
//             : "bg-[#1077FF] text-white hover:bg-[#0d63db]"
//         }`}
//       >
//         {loading ? (
//           <>
//             <svg
//               className="animate-spin h-5 w-5 text-white"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               />
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//               />
//             </svg>
//             Searching...
//           </>
//         ) : (
//           t("search.search_now")
//         )}
//       </button>
//     </div>
//   );
// };

// export default HeroSection;

import { ChevronDown, MapPin } from "lucide-react";
import bgImg from "../../assets/hero-background.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../App.css";

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const clickAppertmentButton = () => navigate("/apartments");
  const clickOwnerButton = () => navigate("/rental");

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const userRole =
    typeof window !== "undefined"
      ? localStorage.getItem("detectedRole") || "tenant"
      : "owner";

  const [propertyOpen, setPropertyOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(
    t("search.property_type_placeholder"),
  );

  const [priceOpen, setPriceOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(
    t("search.price_range_placeholder"),
  );

  const propertyOptions = [
    { value: "", label: t("search.property_type_placeholder") },
    { value: "Studio", label: "Studio / Bachelor" },
    { value: "Apartment", label: "Apartment / Flat" },
    { value: "Condo", label: "Condominium (Condo)" },
    { value: "House", label: "House / Family Home" },
    { value: "Townhouse", label: "Townhouse" },
    { value: "Villa", label: "Villa / Luxury Estate" },
  ];

  const priceOptions = [
    { value: "", label: t("search.price_range_placeholder") },
    { value: "0-1000", label: "€0 - €1,000 (Budget)" },
    { value: "1000-1500", label: "€1,000 - €1,500 (Standard)" },
    { value: "1500-2000", label: "€1,500 - €2,000 (Mid-Range)" },
    { value: "2000-3000", label: "€2,000 - €3,000 (Premium)" },
    { value: "3000-5000", label: "€3,000 - €5,000 (Luxury)" },
    { value: "5000+", label: "€5,000+ (High-End)" },
  ];

  return (
    <div className="w-full">
      <div className="relative min-h-[650px] sm:min-h-[680px] lg:min-h-[750px] rounded-2xl overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(16,119,255,0.00)_36.59%,#1077FF_100%)]" />
          <img
            src={bgImg}
            alt="Modern architecture building"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative px-4 sm:px-8 lg:px-12 xl:px-20 pt-16 sm:pt-20 lg:pt-28 pb-10 ">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* LEFT SIDE */}
            <div className="text-white space-y-6 lg:space-y-8">
              <h1 className="text-white font-dm-sans text-3xl lg:text-6xl font-semibold leading-[120%] tracking-[0.64px]">
                {t("hero.title")}{" "}
                <span className="larken-font text-white text-3xl lg:text-6xl font-normal italic">
                  {t("hero.title") === "Find your Apartment Quickly"
                    ? "Apartment Quickly"
                    : ""}
                </span>
                {t("hero.subtitle")}
              </h1>

              <p className="text-white text-md lg:text-2xl">
                {t("hero.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={clickAppertmentButton}
                  className="px-6 py-4 bg-white text-[#1077FF] rounded-xl font-semibold"
                >
                  {t("hero.our_apartments")}
                </button>
                {!isLoggedIn && (
                  <button
                    onClick={clickOwnerButton}
                    className="px-6 py-4 border border-white text-white rounded-xl font-semibold"
                  >
                    {t("hero.i_am_owner")}
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT SIDE (Search Form) */}
            {(!isLoggedIn || userRole !== "owner") && (
              <div className="lg:flex lg:justify-end w-full">
                <div className="block lg:hidden mt-10">
                  <SearchForm
                    propertyOpen={propertyOpen}
                    setPropertyOpen={setPropertyOpen}
                    selectedProperty={selectedProperty}
                    setSelectedProperty={setSelectedProperty}
                    propertyOptions={propertyOptions}
                    priceOpen={priceOpen}
                    setPriceOpen={setPriceOpen}
                    selectedPrice={selectedPrice}
                    setSelectedPrice={setSelectedPrice}
                    priceOptions={priceOptions}
                  />
                </div>

                <div className="hidden lg:block max-w-md w-full">
                  <SearchForm
                    propertyOpen={propertyOpen}
                    setPropertyOpen={setPropertyOpen}
                    selectedProperty={selectedProperty}
                    setSelectedProperty={setSelectedProperty}
                    propertyOptions={propertyOptions}
                    priceOpen={priceOpen}
                    setPriceOpen={setPriceOpen}
                    selectedPrice={selectedPrice}
                    setSelectedPrice={setSelectedPrice}
                    priceOptions={priceOptions}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------- SEARCH FORM (UPDATED ONLY LOGIC, NO UI CHANGE) ----------------

const SearchForm: React.FC<any> = ({
  propertyOpen,
  setPropertyOpen,
  selectedProperty,
  setSelectedProperty,
  propertyOptions,
  priceOpen,
  setPriceOpen,
  selectedPrice,
  setSelectedPrice,
  priceOptions,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [locationValue, setLocationValue] = useState("");

  const handleSearch = () => {
    if (loading) return;
    setLoading(true);

    const params = {
      property_type:
        selectedProperty !== t("search.property_type_placeholder")
          ? propertyOptions.find((p) => p.label === selectedProperty)?.value
          : "",
      price:
        selectedPrice !== t("search.price_range_placeholder")
          ? selectedPrice
          : "",
      location: locationValue,
    };

    const query = new URLSearchParams(params).toString();
    // console.log(query);

    setTimeout(() => {
      navigate(`/search-result?${query}`);
    }, 800);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-6 lg:p-8">
      <h3 className="text-gray-900 font-semibold text-lg sm:text-xl mb-5 sm:mb-6">
        {t("search.find_home")}
      </h3>

      {/* Property Dropdown */}
      <div className="mb-4 relative">
        <label className="block text-gray-700 text-sm font-semibold mb-2 pl-1">
          {t("search.property_type")}
        </label>
        <button
          type="button"
          onClick={() => setPropertyOpen(!propertyOpen)}
          className="w-full px-4 py-3.5 bg-[#EEF5FD] rounded-xl flex justify-between"
        >
          <span className="truncate">{selectedProperty}</span>
          <ChevronDown
            className={`w-5 h-5 text-[#1077FF] ${
              propertyOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {propertyOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white border rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
            {propertyOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setSelectedProperty(opt.label);
                  setPropertyOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-sm hover:bg-[#EEF5FD]"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Location */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2 pl-1">
          {t("search.location")}
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder={t("search.location_placeholder")}
            value={locationValue}
            onChange={(e) => setLocationValue(e.target.value)}
            className="w-full px-4 py-3.5 bg-[#EEF5FD] rounded-xl"
          />
          <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1077FF]" />
        </div>
      </div>

      {/* Price Dropdown */}
      <div className="mb-6 relative">
        <label className="block text-gray-700 text-sm font-semibold mb-2 pl-1">
          {t("search.price_range")}
        </label>
        <button
          type="button"
          onClick={() => setPriceOpen(!priceOpen)}
          className="w-full px-4 py-3.5 bg-[#EEF5FD] rounded-xl flex justify-between"
        >
          <span className="truncate">{selectedPrice}</span>
          <ChevronDown
            className={`w-5 h-5 text-[#1077FF] ${
              priceOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {priceOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white border rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
            {priceOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setSelectedPrice(opt.label);
                  setPriceOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-sm hover:bg-[#EEF5FD]"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        disabled={loading}
        className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-3 ${
          loading
            ? "bg-[#0d63db] cursor-not-allowed"
            : "bg-[#1077FF] hover:bg-[#0d63db]"
        } text-white`}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Searching...
          </>
        ) : (
          t("search.search_now")
        )}
      </button>
    </div>
  );
};

export default HeroSection;
