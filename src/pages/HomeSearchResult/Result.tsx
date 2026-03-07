import { useState } from "react";
import Header from "../../components/Apartments/Header";
import SeachComponents from "../../components/Apartments/SearchComponents";
import ApartmentCard from "../../components/Apartments/Card";

import { useSearchParams } from "react-router-dom"; // ⭐ NEW
import { useSearchPropertiesQuery } from "../../redux/featuresAPI/properties/property.api"; // ⭐ NEW

const App = () => {
  const [visibleCount, setVisibleCount] = useState(9);

  const [searchParams] = useSearchParams(); // ⭐ NEW

  const params = {
    property_type: searchParams.get("property_type") || "",
    price: searchParams.get("price") || "",
    location: searchParams.get("location") || "",
  };

  const { data, isLoading } = useSearchPropertiesQuery(params); 
  const apartments = data?.results || [];

  const handleShowMore = () => {
    setVisibleCount(apartments.length);
  };

  const handleModifySearch = () => {
    alert("Search functionality would be implemented here!");
  };

  return (
    <div className="bg-[#FFFFFF] font-sans">
      <Header />

      <div className="container m-auto p-4 md:p-8 lg:px-16">
        <SeachComponents onSearch={handleModifySearch} />

        {/* Apartment Cards */}
        {isLoading ? (
          <p className="text-center py-10 text-xl">Loading...</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 relative -top-15 lg:grid-cols-3">
            {apartments.slice(0, visibleCount).map((apartment: Record<string, any>) => (
              <ApartmentCard key={apartment.id} apartment={apartment} />
            ))}
          </div>
        )}

        {/* SHOW MORE Button */}
        {!isLoading && visibleCount === 9 && apartments.length > 9 && (
          <div className="flex justify-center ">
            <button
              onClick={handleShowMore}
              className="px-6 py-3 text-[#061251] rounded-lg font-medium hover:bg-opacity-80 border border-[#061251]"
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
