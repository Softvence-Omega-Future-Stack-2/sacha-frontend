import { useState, useEffect } from "react";
import { Loader2, Heart, MapPin, Search } from "lucide-react";
import Title from "../Title";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useLazyGetTenantSearchQuery } from "../../../../redux/featuresAPI/tenant/tenantSearch.api";
import { toast } from "sonner";

// Images import
import furniture from "../../../../assets/funiture.png";
import meter from "../../../../assets/meter.png";
import room from "../../../../assets/room.png";
import featured4 from "../../../../assets/featured4.png";

interface Apartment {
  id: number;
  image: string;
  price: number;
  title: string;
  location: string;
  furniture: string;
  rooms: string;
  area: string;
  isFavorite: boolean;
}

export default function MySearchComponent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [triggerSearch, { data: searchResults, isFetching: isSearchLoading, isError: isSearchError }] = useLazyGetTenantSearchQuery();

  // Form States
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("Apartment");
  const [selectedRentalType, setSelectedRentalType] = useState("Furniture");
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [minSurface, setMinSurface] = useState("");
  const [maxSurface, setMaxSurface] = useState("");
  const [selectedPieces, setSelectedPieces] = useState<number | null>(1);
  const [selectedRooms, setSelectedRooms] = useState<number | null>(null);
  const [selectedBedrooms, setSelectedBedrooms] = useState<number | null>(null);
  const [selectedBathrooms, setSelectedBathrooms] = useState<number | null>(null);
  const [orientation, setOrientation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [moveInDate, setMoveInDate] = useState<Date | undefined>(undefined);

  // Result Page Data (Mapped from searchResults)
  const [apartments, setApartments] = useState<Apartment[]>([]);

  useEffect(() => {
    if (searchResults?.results) {
      const mapped = searchResults.results.map((apt: any) => ({
        id: apt.id,
        image: apt.images?.[0]?.image || featured4,
        price: Number(apt.rent || 0),
        title: apt.title,
        location: apt.address || apt.city,
        furniture: apt.rental_type,
        rooms: `${apt.rooms || 0} Rooms`,
        area: `${apt.surface_sqm || 0} m²`,
        isFavorite: false,
      }));
      setApartments(mapped);
    }
  }, [searchResults]);

  const navigate = useNavigate();

  // Pagination
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(apartments.length / itemsPerPage);
  const currentPageItems = apartments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Toggle Favorite
  const toggleFavorite = (id: number) => {
    setApartments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, isFavorite: !apt.isFavorite } : apt))
    );
    const apartment = apartments.find((apt) => apt.id === id);
    toast.success(!apartment?.isFavorite ? "Saved to Favorites" : "Removed from favorites");
  };

  const handleViewDetails = () => {
    navigate(`/product-details`);
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const goToNext = async () => {
    if (currentStep === 3) {
      try {
        await triggerSearch({
          city: city,
          postal_code: postalCode,
          property_type: selectedPropertyType.toLowerCase(),
          rental_type: selectedRentalType.toLowerCase(),
          min_rent: minRent ? Number(minRent) : undefined,
          max_rent: maxRent ? Number(maxRent) : undefined,
          min_surface: minSurface ? Number(minSurface) : undefined,
          max_surface: maxSurface ? Number(maxSurface) : undefined,
          rooms: selectedRooms || undefined,
          bedrooms: selectedBedrooms || undefined,
          bathrooms: selectedBathrooms || undefined,
          furnished: selectedRentalType === "Furniture",
          orientation: orientation.toLowerCase(),
          search: searchTerm,
        }).unwrap();
        setCurrentStep(4);
      } catch (err) {
        toast.error("Failed to fetch search results. Please try again.");
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <Title title="My Search" paragraph="Manage your assets and applications in the blink of an eye" />

      <div className="py-4">
        <div className="max-w-7xl mx-auto">

          {/* Progress Steps */}
          {currentStep <= 3 && (
            <div className="mt-10 mb-12 flex items-center mx-auto max-w-3xl justify-center">
              <div className="flex flex-col items-center">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-medium transition-all ${currentStep >= 1 ? "border-2 border-[#1077FF] bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-400"}`}>1</div>
                <span className={`mt-2 text-sm font-medium ${currentStep >= 1 ? "text-blue-700" : "text-gray-400"}`}>Information</span>
              </div>
              <div className="mx-8 flex-1 border-t-2 border-dashed border-gray-300"></div>
              <div className="flex flex-col items-center">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-medium transition-all ${currentStep >= 2 ? "border-2 border-[#1077FF] bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-400"}`}>2</div>
                <span className={`mt-2 text-sm font-medium ${currentStep >= 2 ? "text-blue-700" : "text-gray-400"}`}>Sectors</span>
              </div>
              <div className="mx-8 flex-1 border-t-2 border-dashed border-gray-300"></div>
              <div className="flex flex-col items-center">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-medium transition-all ${currentStep >= 3 ? "border-2 border-[#1077FF] bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-400"}`}>3</div>
                <span className={`mt-2 text-sm font-medium ${currentStep >= 3 ? "text-blue-700" : "text-gray-400"}`}>Services</span>
              </div>
            </div>
          )}

          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="rounded-2xl mx-auto max-w-3xl">
              <h2 className="mb-8 text-2xl font-semibold text-gray-900">General Information</h2>
              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      placeholder="e.g. New York"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">Postal Code</label>
                    <input
                      type="text"
                      placeholder="e.g. 10001"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">Property type</label>
                    <div className="flex flex-wrap gap-3">
                      {["Apartment", "Home"].map((t) => (
                        <button key={t} onClick={() => setSelectedPropertyType(t)} className={`rounded-full border px-6 py-3 text-sm font-medium transition-all ${selectedPropertyType === t ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">Rental type</label>
                    <div className="flex flex-wrap gap-3">
                      {["Furniture", "Unfurnished"].map((t) => (
                        <button key={t} onClick={() => setSelectedRentalType(t)} className={`rounded-full border px-6 py-3 text-sm font-medium transition-all ${selectedRentalType === t ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-700">Desired move-in date</label>
                  <div className="relative max-w-sm">
                    <input type="date" className="h-12 w-full rounded-lg border border-gray-300 pl-4 pr-2 text-gray-700 focus:outline-none"
                      value={moveInDate ? format(moveInDate, "yyyy-MM-dd") : ""}
                      onChange={(e) => setMoveInDate(e.target.value ? new Date(e.target.value) : undefined)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">Minimum rent</label>
                    <input
                      placeholder="€0.00"
                      value={minRent}
                      onChange={(e) => setMinRent(e.target.value)}
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">Maximum rent</label>
                    <input
                      placeholder="€0.00"
                      value={maxRent}
                      onChange={(e) => setMaxRent(e.target.value)}
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">Minimum surface (m²)</label>
                    <input
                      placeholder="0.00"
                      value={minSurface}
                      onChange={(e) => setMinSurface(e.target.value)}
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">Maximum surface (m²)</label>
                    <input
                      placeholder="0.00"
                      value={maxSurface}
                      onChange={(e) => setMaxSurface(e.target.value)}
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {["Number of pieces", "Number of rooms"].map((label) => {
                    const isPieces = label === "Number of pieces";
                    const selected = isPieces ? selectedPieces : selectedRooms;
                    const setSelected = isPieces ? setSelectedPieces : setSelectedRooms;
                    return (
                      <div key={label}>
                        <label className="mb-3 block text-sm font-medium text-gray-700">{label}</label>
                        <div className="flex gap-3">
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <button key={n} onClick={() => setSelected(n)} className={`h-12 w-12 rounded-lg border text-sm font-medium transition-all ${selected === n ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 bg-white hover:bg-gray-50"}`}>
                              {n}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-12 text-center">
                <button
                  onClick={goToNext}
                  disabled={isSearchLoading}
                  className="inline-flex h-14 w-full max-w-md items-center justify-center rounded-full bg-blue-600 px-12 text-lg font-semibold text-white hover:bg-blue-700 disabled:opacity-80 transition"
                >
                  {isSearchLoading ? (
                    <>
                      <Loader2 className="mr-3 animate-spin" size={24} />
                      Saving...
                    </>
                  ) : (
                    "SAVE AND CONTINUE"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="rounded-2xl mx-auto max-w-3xl">
              <h2 className="mb-8 text-2xl font-semibold text-gray-900">Research sectors</h2>
              <div className="space-y-8">
                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-700">Keyword Search</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      placeholder="e.g. Garden, Wifi, Downtown..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-14 w-full rounded-xl border border-gray-300 pl-12 pr-5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-700">Specific City/Postal Code (Advanced)</label>
                  <p className="text-sm text-gray-500 mb-4">Values from step 1 are used by default.</p>
                </div>
              </div>
              <div className="mt-16 flex flex-col sm:flex-row justify-center gap-6">
                <button onClick={goBack} className="h-14 w-full sm:w-48 rounded-full border border-gray-300 bg-white px-8 text-lg font-medium text-gray-700 hover:bg-gray-50 transition">BACK</button>
                <button onClick={goToNext} disabled={isSearchLoading} className="h-14 w-full sm:w-64 rounded-full bg-blue-600 px-8 text-lg font-semibold text-white hover:bg-blue-700 disabled:opacity-80 transition inline-flex items-center justify-center">
                  {isSearchLoading ? <><Loader2 className="mr-3 animate-spin" size={24} />Saving...</> : "SAVE AND CONTINUE"}
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div className="rounded-2xl mx-auto max-w-4xl">
              <h2 className="mb-8 text-2xl font-semibold text-gray-900">Detailed Features</h2>
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">Number of bedrooms</label>
                    <div className="flex flex-wrap gap-3">
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <button key={n} onClick={() => setSelectedBedrooms(n)} className={`h-11 w-11 rounded-lg border text-sm font-medium transition-all ${selectedBedrooms === n ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 bg-white hover:bg-gray-50"}`}>
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">Number of bathrooms</label>
                    <div className="flex flex-wrap gap-3">
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <button key={n} onClick={() => setSelectedBathrooms(n)} className={`h-11 w-11 rounded-lg border text-sm font-medium transition-all ${selectedBathrooms === n ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 bg-white hover:bg-gray-50"}`}>
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-700">Orientation</label>
                  <div className="flex flex-wrap gap-3">
                    {["South", "North", "East", "West"].map((o) => (
                      <button key={o} onClick={() => setOrientation(o)} className={`rounded-full border px-6 py-2.5 text-sm font-medium transition-all ${orientation === o ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"}`}>
                        {o}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-6 text-lg font-medium text-gray-800">Select desired features</h3>
                  <div className="flex flex-wrap gap-3">
                    {["Garden", "Pool", "Balcony", "Terrace", "Box", "Garage", "Parking", "Cellar", "Basement", "No overlooking", "Beautiful view"].map((feature) => (
                      <button key={feature} onClick={() => toggleFeature(feature)} className={`rounded-full border px-6 py-3 text-sm font-medium transition-all ${selectedFeatures.includes(feature) ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400"}`}>
                        {feature}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-16 flex flex-col sm:flex-row justify-center gap-6">
                <button onClick={goBack} className="h-14 w-full sm:w-48 rounded-full border border-gray-300 bg-white px-8 text-lg font-medium text-gray-700 hover:bg-gray-50 transition">BACK</button>
                <button onClick={goToNext} disabled={isSearchLoading} className="h-14 w-full sm:w-68 rounded-full bg-blue-600 px-8 text-lg font-semibold text-white hover:bg-blue-700 disabled:opacity-80 transition inline-flex items-center justify-center">
                  {isSearchLoading ? <><Loader2 className="mr-3 animate-spin" size={24} />Searching...</> : "FINISH & SAVE SEARCH"}
                </button>
              </div>
            </div>
          )}

          {/* Step 4 - Results Page */}
          {currentStep === 4 && (
            <div className="max-w-7xl mx-auto  py-12">
              <div className="text-center mb-12">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a4d]">
                  Search <span className="italic font-normal">Results</span>
                </h1>
                <p className="mt-3 text-lg text-[#1a1a4d]/80">
                  {apartments.length > 0
                    ? `We found ${apartments.length} apartments matching your criteria`
                    : "No apartments match your search criteria at the moment."}
                </p>
              </div>

              {/* No Results or Loading */}
              {isSearchLoading && (
                <div className="text-center py-20">
                  <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-500">Searching for properties...</p>
                </div>
              )}

              {isSearchError && (
                <div className="text-center py-20">
                  <p className="text-red-500 mb-4">An error occurred while fetching properties.</p>
                  <button onClick={goToNext} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Try Again
                  </button>
                </div>
              )}

              {!isSearchLoading && !isSearchError && apartments.length === 0 && (
                <div className="text-center py-20">
                  <div className="bg-gray-100 w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V9a2 2 0 00-2-2h-2M4 13V9a2 2 0 012-2h2m8 0h2a2 2 0 012 2v4m-8-4v10" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-700">No results found</h3>
                  <p className="mt-3 text-gray-500">Try adjusting your filters to see more options.</p>
                </div>
              )}

              {/* Results Grid */}
              {apartments.length > 0 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {currentPageItems.map((apartment) => (
                      <div key={apartment.id} className="p-3 bg-[#FBFBFB] rounded-2xl">
                        <div className="rounded-2xl transition-shadow duration-300 hover:shadow-xl">
                          <div className="relative h-64 overflow-hidden group rounded-2xl">
                            <img
                              src={apartment.image}
                              alt={apartment.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <button
                              onClick={() => toggleFavorite(apartment.id)}
                              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform duration-200"
                            >
                              <Heart
                                className={`w-5 h-5 ${apartment.isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"}`}
                              />
                            </button>
                          </div>

                          <div className="p-0 mt-6">
                            <div className="mb-3">
                              <span className="text-3xl font-bold text-[#0d6efd]">€{apartment.price}</span>
                              <span className="text-sm text-gray-600">/month CC</span>
                            </div>
                            <h3 className="text-lg font-semibold text-[#061251] mb-3">{apartment.title}</h3>
                            <div className="flex items-center gap-2 text-[#061251] mb-4">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{apartment.location}</span>
                            </div>
                            <div className="flex items-center gap-4 mb-5 text-[#646492]">
                              <div className="flex items-center gap-1.5">
                                <img src={furniture} alt="furniture" className="w-6 h-6" />
                                <span className="text-xs">{apartment.furniture}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <img src={room} alt="room" className="w-6 h-6" />
                                <span className="text-xs">{apartment.rooms}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <img src={meter} alt="area" className="w-6 h-6" />
                                <span className="text-xs">{apartment.area}</span>
                              </div>
                            </div>
                            <button
                              onClick={handleViewDetails}
                              className="w-full py-2 border border-[#06125133] text-[#061251] rounded-xl font-medium hover:bg-[#1077FF] hover:text-white transition-colors duration-200"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-3 mt-12">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-12 h-12 rounded-full font-medium transition-all ${currentPage === page
                            ? "bg-[#1077FF] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}