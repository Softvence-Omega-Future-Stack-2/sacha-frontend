import React, { useState, useRef, useEffect } from "react";
import {
  Loader2,
  ChevronDown,
  Check,
  Upload,
  X,
} from "lucide-react";
import { useAddOwnerAdMutation } from "../../../../redux/featuresAPI/owner/owner.api";
import Title from "../Title";
import { toast } from "sonner";


// Images


interface UploadedFile {
  file: File;
  preview: string;
}

interface MySearchComponentProps {
  onBack: () => void;
}

export default function MySearchComponent({ onBack }: MySearchComponentProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [addOwnerAd, { isLoading }] = useAddOwnerAdMutation();

  // Form States
  const [selectedPropertyType, setSelectedPropertyType] = useState("Apartment");
  const [selectedRentalType, setSelectedRentalType] = useState("Furnished");
  const [selectedPieces, setSelectedPieces] = useState<number | null>(null);
  const [selectedRooms, setSelectedRooms] = useState<number | null>(null);
  const [moveInDate, setMoveInDate] = useState<string>("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [rent, setRent] = useState("");
  const [charges, setCharges] = useState("");
  const [deposit, setDeposit] = useState("");
  const [surface, setSurface] = useState("");
  const [floor, setFloor] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [bathrooms, setBathrooms] = useState<number | null>(null);
  const [orientation, setOrientation] = useState("north");
  const [selectedEnergyClass, setSelectedEnergyClass] = useState<string | null>(null);
  const [selectedGHG, setSelectedGHG] = useState<string | null>(null);
  const [rentGuaranteeInsurance, setRentGuaranteeInsurance] = useState(true);
  const [serviceTags, setServiceTags] = useState<string[]>([]);

  useEffect(() => {
    toast("Welcome to Property Creation");
  }, []);

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);




  const validateStep = (step: number) => {
    console.log(`Validating step ${step}`, { title, address, city, postalCode, rent });
    switch (step) {
      case 1:
        if (!title.trim()) { toast.error("Title is required"); return false; }
        if (!address.trim()) { toast.error("Address is required"); return false; }
        // Temporarily relaxed for debugging
        // if (!city.trim()) { toast.error("City is required"); return false; }
        // if (!postalCode.trim()) { toast.error("Postal code is required"); return false; }
        if (!rent || isNaN(Number(rent))) { toast.error("Valid rent amount is required"); return false; }
        return true;
      case 2:
        if (!surface || isNaN(Number(surface))) { toast.error("Valid surface area is required"); return false; }
        if (!selectedRooms) { toast.error("Please select number of rooms"); return false; }
        if (!selectedPieces) { toast.error("Please select number of pieces"); return false; }
        return true;
      case 3:
        if (uploadedFiles.length !== MAX_IMAGES) {
          toast.error(`Please upload exactly ${MAX_IMAGES} images`);
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const goToNext = async () => {
    if (!validateStep(currentStep)) return;

    if (currentStep === 4) {
      try {
        const formData = new FormData();

        // Append basic fields
        formData.append("title", title);
        formData.append("description", description || "No description provided");
        formData.append("address", address);
        formData.append("display_address", address);
        formData.append("show_exact_address", "true");
        formData.append("city", city);
        formData.append("postal_code", postalCode);
        formData.append("property_type", selectedPropertyType.toLowerCase());
        formData.append("rental_type", selectedRentalType.toLowerCase());
        formData.append("available_from", moveInDate || new Date().toISOString().split('T')[0]);
        formData.append("rent", rent);
        formData.append("monthly_charges", charges || "0");
        formData.append("deposit", deposit || "0");
        formData.append("surface_sqm", surface);
        formData.append("rooms", String(selectedRooms || 0));
        formData.append("pieces", String(selectedPieces || 0));
        formData.append("floor", floor || "0");
        formData.append("built_year", yearBuilt || "0");
        formData.append("dpe", selectedEnergyClass || "A");
        formData.append("ghg", selectedGHG || "A");
        formData.append("furnished", String(selectedRentalType.toLowerCase() === "furnished"));
        formData.append("bedrooms", String(bedrooms || 1));
        formData.append("bathrooms", String(bathrooms || 1));
        formData.append("orientation", orientation);
        formData.append("rent_guarantee_insurance", String(rentGuaranteeInsurance));

        // Append images
        uploadedFiles.forEach((fileObj) => {
          formData.append("uploaded_images", fileObj.file);
        });

        // Append metadata for images (as comma-separated strings if multiple)
        const imageMetadata = uploadedFiles.map(() => "property image"); // default alt/caption
        formData.append("image_alt_texts", imageMetadata.join(","));
        formData.append("image_captions", imageMetadata.join(","));
        formData.append("image_is_primary", uploadedFiles.map((_, i) => i === 0).join(","));
        formData.append("image_sort_orders", uploadedFiles.map((_, i) => i).join(","));

        // service tag ids
        if (serviceTags.length > 0) {
          // Assuming the backend might want labels if no IDs are available, or mapping them
          formData.append("service_tags", serviceTags.join(","));
        }

        await addOwnerAd(formData).unwrap();

        toast.success("Property created successfully!");
        setTimeout(() => {
          onBack();
        }, 2000);

      } catch (err: any) {
        console.error("Failed to add property:", err);
        const errorMessage = err?.data?.detail || err?.data?.message || "Failed to create property. Please try again.";
        toast.error(errorMessage);
      }
    } else {
      console.log("Moving to step", currentStep + 1);
      toast(`Moving to ${currentStep + 1}`);
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => setCurrentStep(currentStep - 1);

  // Upload handlers
  const handleClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(Array.from(e.target.files));
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) handleFiles(Array.from(e.dataTransfer.files));
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const MAX_IMAGES = 4;
  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const availableSlots = MAX_IMAGES - uploadedFiles.length;
    const filesToProcess = imageFiles.slice(0, availableSlots);

    const newUploads = filesToProcess.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setUploadedFiles((prev) => [...prev, ...newUploads]);

    if (imageFiles.length > filesToProcess.length) {
      console.log(`Only ${filesToProcess.length} image(s) uploaded. The maximum is ${MAX_IMAGES}.`);
    }
  };

  const removeImage = (index: number) => {
    setUploadedFiles((prev) => {
      const newList = prev.filter((_, i) => i !== index);
      URL.revokeObjectURL(prev[index].preview);
      return newList;
    });
  };

  // Custom Components
  const CustomSelect = ({ label, value, options, onChange, placeholder }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel = options.find((o: any) => o.value === value)?.label || "";

    return (
      <div ref={ref}>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white flex items-center justify-between text-left text-gray-700 focus:outline-none transition-all"
          >
            <span className={selectedLabel ? "text-gray-900" : "text-gray-400"}>
              {selectedLabel || placeholder}
            </span>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <div className="absolute z-20 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg max-h-60 overflow-y-auto">
              {options.map((option: any) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 flex items-center justify-between"
                >
                  <span>{option.label}</span>
                  {value === option.value && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const CustomDatePicker = ({ label, value, onChange }: { label: string; value: string; onChange: (date: string) => void }) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-12 px-4 rounded-lg border border-gray-300 text-gray-900 bg-white focus:outline-none"
        />
      </div>
    );
  };

  const propertyOptions = [
    { value: "Apartment", label: "Apartment" },
    { value: "House", label: "House" },
    { value: "Studio", label: "Studio" },
    { value: "Villa", label: "Villa" },
  ];

  const rentalOptions = [
    { value: "Furnished", label: "Furnished" },
    { value: "Unfurnished", label: "Unfurnished" },
  ];



  return (
    <>
      <Title title="Create Ad" paragraph="Manage your assets and applications in the blink of an eye" />


      <div>
        <div>

          {/* Progress Bar */}
          {currentStep <= 4 && (
            <div className="mt-10 mb-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="hidden sm:flex items-center justify-center gap-8">
                  {[
                    { num: 1, label: "Information" },
                    { num: 2, label: "Details" },
                    { num: 3, label: "Photos" },
                    { num: 4, label: "Services" },
                  ].map((step, index) => (
                    <React.Fragment key={step.num}>
                      {index > 0 && <div className="flex-1 border-t-2 border-dashed border-gray-300" />}
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-semibold transition-all duration-300 shadow-md ${currentStep >= step.num
                            ? "border-2 border-[#1077FF] bg-blue-50 text-blue-600"
                            : "bg-gray-100 text-gray-400"
                            }`}
                        >
                          {step.num}
                        </div>
                        <span className={`mt-2 text-sm font-medium ${currentStep >= step.num ? "text-blue-700" : "text-gray-500"}`}>
                          {step.label}
                        </span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:hidden">
                  {[
                    { num: 1, label: "Information" },
                    { num: 2, label: "Details" },
                    { num: 3, label: "Photos" },
                    { num: 4, label: "Services" },
                  ].map((step) => (
                    <div key={step.num} className="flex flex-col items-center">
                      <div
                        className={`flex h-20 w-20 items-center justify-center rounded-3xl text-2xl font-bold transition-all duration-300 shadow-lg ${currentStep >= step.num
                          ? "border-4 border-[#1077FF] bg-blue-50 text-blue-600 scale-110"
                          : "bg-gray-100 text-gray-400"
                          }`}
                      >
                        {step.num}
                      </div>
                      <span className={`mt-3 text-base font-semibold ${currentStep >= step.num ? "text-blue-700" : "text-gray-500"}`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}


          {/* Step 1 - General Information */}
          {currentStep === 1 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-semibold text-gray-900">General Information</h2>
                <button
                  onClick={onBack}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <X className="w-4 h-4" /> Back to list
                </button>
              </div>
              <p className="mb-8 text-sm text-gray-600">Manage your assets and applications in the blink of an eye</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                    className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none "
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="type here..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 resize-none focus:outline-none "
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter address"
                    className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none "
                  />
                  <p className="mt-2 text-xs text-gray-500">The address will not be visible until consent.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <CustomSelect
                    label="Property type"
                    value={selectedPropertyType}
                    onChange={setSelectedPropertyType}
                    options={propertyOptions}
                    placeholder="Choose type"
                  />
                  <CustomSelect
                    label="Rental type"
                    value={selectedRentalType}
                    onChange={setSelectedRentalType}
                    options={rentalOptions}
                    placeholder="Choose furniture"
                  />
                  <CustomDatePicker label="Available from" value={moveInDate} onChange={setMoveInDate} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Enter city"
                      className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="Enter postal code"
                      className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rent excluding charge</label>
                    <input
                      type="text"
                      value={rent}
                      onChange={(e) => setRent(e.target.value)}
                      placeholder="Enter rent"
                      className="w-full h-12 rounded-lg border border-gray-300 focus:outline-none px-4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Monthly charges</label>
                    <input
                      type="text"
                      value={charges}
                      onChange={(e) => setCharges(e.target.value)}
                      placeholder="Enter charges"
                      className="w-full focus:outline-none h-12 rounded-lg border border-gray-300 px-4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Security deposit</label>
                    <input
                      type="text"
                      value={deposit}
                      onChange={(e) => setDeposit(e.target.value)}
                      placeholder="Enter deposit"
                      className="w-full focus:outline-none h-12 rounded-lg border border-gray-300 px-4"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-12 flex justify-center lg:justify-end">
                <button
                  onClick={goToNext}
                  disabled={isLoading}
                  className="inline-flex h-14 items-center justify-center rounded-full bg-blue-600 px-10 text-lg font-semibold text-white hover:bg-blue-700 disabled:opacity-80 transition-all min-w-64"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "SAVE AND CONTINUE"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 2 - Details */}
          {currentStep === 2 && (
            <div className="w-full">
              <h2 className="mb-8 text-2xl font-semibold text-gray-900">Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Surface area (in m²)</label>
                  <input
                    type="text"
                    value={surface}
                    onChange={(e) => setSurface(e.target.value)}
                    placeholder="Enter Surface area"
                    className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:outline-none "
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Floor</label>
                  <input
                    type="text"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    placeholder="Enter Floor"
                    className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year of construction</label>
                  <input
                    type="text"
                    value={yearBuilt}
                    onChange={(e) => setYearBuilt(e.target.value)}
                    placeholder="Enter Year"
                    className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:outline-none "
                  />
                </div>
              </div>

              <div className="space-y-10 mb-10">
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Number of rooms</label>
                    <div className="flex flex-wrap gap-3">
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <button
                          key={n}
                          onClick={() => setSelectedRooms(n)}
                          className={`w-12 h-12 rounded-xl border-2 font-medium transition-all ${selectedRooms === n
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                            }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Number of pieces</label>
                    <div className="flex flex-wrap gap-3">
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <button
                          key={n}
                          onClick={() => setSelectedPieces(n)}
                          className={`w-12 h-12 rounded-xl border-2 font-medium transition-all ${selectedPieces === n
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                            }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Energy class</label>
                    <div className="flex flex-wrap gap-3">
                      {["A", "B", "C", "D", "E", "F", "G"].map((l) => (
                        <button
                          key={l}
                          onClick={() => setSelectedEnergyClass(l)}
                          className={`w-12 h-12 rounded-xl border-2 font-medium transition-all ${selectedEnergyClass === l
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                            }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-3">GHG (Greenhouse Gas)</label>
                    <div className="flex flex-wrap gap-3">
                      {["A", "B", "C", "D", "E", "F", "G"].map((l) => (
                        <button
                          key={l}
                          onClick={() => setSelectedGHG(l)}
                          className={`w-12 h-12 rounded-xl border-2 font-medium transition-all ${selectedGHG === l
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                            }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Bedrooms</label>
                    <div className="flex flex-wrap gap-3">
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <button
                          key={n}
                          onClick={() => setBedrooms(n)}
                          className={`w-12 h-12 rounded-xl border-2 font-medium transition-all ${bedrooms === n
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                            }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Bathrooms</label>
                    <div className="flex flex-wrap gap-3">
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <button
                          key={n}
                          onClick={() => setBathrooms(n)}
                          className={`w-12 h-12 rounded-xl border-2 font-medium transition-all ${bathrooms === n
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                            }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Orientation</label>
                  <div className="flex flex-wrap gap-3">
                    {["north", "south", "east", "west"].map((o) => (
                      <button
                        key={o}
                        onClick={() => setOrientation(o)}
                        className={`px-6 py-3 rounded-xl border-2 font-medium capitalize transition-all ${orientation === o
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                          }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-16 flex flex-col lg:flex-row gap-4 lg:justify-end">
                <button
                  onClick={goBack}
                  className="h-14 w-full lg:w-auto px-10 rounded-full border border-gray-300 bg-white text-lg font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  BACK
                </button>
                <button
                  onClick={goToNext}
                  disabled={isLoading}
                  className="h-14 w-full lg:w-auto px-10 rounded-full bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-70 min-w-64 flex items-center justify-center"
                >
                  {isLoading ? (
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


          {/* Step 3 - Photos */}
          {currentStep === 3 && (
            <div>
              <h2 className="mb-8 text-2xl font-semibold text-gray-900">Photos</h2>

              {uploadedFiles.length < MAX_IMAGES && (
                <div
                  onClick={handleClick}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50/50 h-64 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={uploadedFiles.length >= MAX_IMAGES}
                  />

                  {uploadedFiles.length === 0 ? (
                    <>
                      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        <Upload className="w-8 h-8 text-blue-600" />
                      </div>
                      <p className="text-gray-600 font-medium">
                        Click here to select your file or drag and drop
                        <br />
                        images into this area
                      </p>
                      <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB. Exactly 4 photos required</p>
                    </>
                  ) : (
                    <div className="text-blue-600 font-medium">
                      <Upload className="w-8 h-8 mx-auto mb-2" />
                      Click or drop more images
                    </div>
                  )}
                </div>
              )}

              {uploadedFiles.length > 0 && (
                <div className={`mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ${uploadedFiles.length < MAX_IMAGES ? 'opacity-80' : ''}`}>
                  {uploadedFiles.map((item, index) => (
                    <div key={index} className="relative group overflow-hidden">
                      <img src={item.preview} alt={`Upload ${index + 1}`} className="max-w-full object-fill " />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-col lg:flex-row gap-4 lg:justify-end">
                <button
                  onClick={goBack}
                  className="h-14 px-10 rounded-full border border-gray-300 bg-white text-lg font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  BACK
                </button>
                <button
                  onClick={goToNext}
                  disabled={isLoading || uploadedFiles.length !== MAX_IMAGES}
                  className={`h-14 px-10 rounded-full text-lg font-semibold transition min-w-64 flex items-center justify-center ${uploadedFiles.length !== MAX_IMAGES
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-3 animate-spin" size={24} />
                      Saving...
                    </>
                  ) : (
                    "SAVE AND CONTINUE"
                  )}
                </button>
              </div>

              <p className={`text-center mt-4 text-sm font-semibold ${uploadedFiles.length === MAX_IMAGES ? 'text-green-600' : 'text-red-500'}`}>
                {uploadedFiles.length} / {MAX_IMAGES} images uploaded. You must upload exactly 4 photos to proceed.
              </p>
            </div>
          )}



          {/* Step 4 - Services */}
          {currentStep === 4 && (
            <div>
              <h2 className="mb-8 text-2xl font-semibold text-gray-900">Services</h2>

              <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  {["Garden", "Pool", "Balcony", "Terrace", "Box", "Garage", "Parking", "Cellar", "Basement"].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setServiceTags(prev =>
                          prev.includes(item) ? prev.filter(t => t !== item) : [...prev, item]
                        );
                      }}
                      className={`px-6 py-3 rounded-full font-medium transition-all ${serviceTags.includes(item)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {["No overlooking", "Beautiful view", "South-facing"].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setServiceTags(prev =>
                          prev.includes(item) ? prev.filter(t => t !== item) : [...prev, item]
                        );
                      }}
                      className={`px-6 py-3 rounded-full font-medium transition-all ${serviceTags.includes(item)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-8">
                  <input
                    type="checkbox"
                    checked={rentGuaranteeInsurance}
                    onChange={(e) => setRentGuaranteeInsurance(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="text-gray-700">I would like a Rent Guarantee Insurance policy.</label>
                </div>

                <div className="mt-8 flex flex-col lg:flex-row gap-4 lg:justify-end">
                  <button
                    onClick={goBack}
                    className="h-14 px-10 rounded-full border border-gray-300 bg-white text-lg font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    BACK
                  </button>
                  <button
                    onClick={goToNext}
                    disabled={isLoading}
                    className="h-14 px-10 rounded-full bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition min-w-64 flex items-center justify-center"
                  >
                    {isLoading ? (
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
            </div>
          )}
        </div>
      </div>
    </>
  );
}
