import React, { useState } from 'react';
import bgImg from '../../assets/rental/bg-image.png';
import { CircleUser, CheckCircle2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useAddOwnerAdMutation } from "../../redux/featuresAPI/owner/owner.api";
import toast, { Toaster } from "react-hot-toast";

// --- Reusable Close Icon Component ---
const CloseIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// --- Success Modal ---
const SuccessModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl p-10 max-w-sm w-full shadow-2xl text-center">
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Ad Created Successfully!</h3>
        <p className="text-gray-600">Your property ad is now live.</p>
      </div>
    </div>
  );
};

// --- Ad Modal Component ---
interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CONSTANT_EQUIPMENT = [
  'WiFi', 'Terrace', 'Elevator', 'Air Conditioning',
  'Parking', 'Garden', 'Dishwasher', 'Heating',
  'Balcony', 'Cellar', 'Washing machine', 'Chimney'
];

const AdModal: React.FC<AdModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [addOwnerAd] = useAddOwnerAdMutation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    display_address: "",
    show_exact_address: true,
    city: "",
    postal_code: "",
    property_type: "studio",
    rental_type: "furnished",
    available_from: "",
    rent: "1200",
    monthly_charges: "0",
    deposit: "1200",
    surface_sqm: 50,
    rooms: 1,
    pieces: 1,
    floor: 0,
    built_year: new Date().getFullYear(),
    dpe: "A",
    ghg: "A",
    furnished: true,
    bedrooms: 1,
    bathrooms: 1,
    orientation: "north",
    rent_guarantee_insurance: false,
    service_tags: [] as string[],
  });

  const [images, setImages] = useState<File[]>([]);

  React.useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setAnimate(true), 20);
    } else {
      setAnimate(false);
      const timeoutId = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormData(prev => ({ ...prev, [name]: value ? Number(value) : 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEquipmentChange = (item: string, checked: boolean) => {
    setFormData(prev => {
      if (checked) {
        return { ...prev, service_tags: [...prev.service_tags, item] };
      } else {
        return { ...prev, service_tags: prev.service_tags.filter(tag => tag !== item) };
      }
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setImages(prev => [...prev, ...Array.from(files)]);
    e.target.value = ''; // Reset input so same file can be selected again if needed
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreateAd = async () => {
    // Form Validation
    if (!formData.title || !formData.address || !formData.city || !formData.rent || !formData.available_from) {
      toast.error("Please fill out all required fields (Title, Address, City, Rent, Available From).");
      return;
    }

    setIsLoading(true);

    try {
      const payload = new FormData();
      payload.append("status", "draft");

      Object.keys(formData).forEach((key) => {
        const val = (formData as any)[key];
        if (key === "service_tags") {
          formData.service_tags.forEach(tag => payload.append("service_tags", tag));
        } else if (typeof val === "boolean") {
          payload.append(key, val ? "true" : "false");
        } else if (val !== undefined && val !== null) {
          payload.append(key, String(val));
        }
      });

      images.forEach((img) => payload.append("uploaded_images", img));

      if (images.length > 0) {
        payload.append("image_alt_texts", images.map(() => "property image").join(","));
        payload.append("image_captions", images.map(() => "property").join(","));
        payload.append("image_is_primary", images.map((_, i) => (i === 0 ? "true" : "false")).join(","));
        payload.append("image_sort_orders", images.map((_, i) => i.toString()).join(","));
      }

      await addOwnerAd(payload).unwrap();
      onClose();
      onSuccess();
    } catch (err: any) {
      console.error("Ad creation failed:", err);
      toast.error(err?.data?.message || err?.data?.detail || "Failed to create ad. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-500 ${animate ? 'bg-gray-900/50 opacity-100' : 'bg-gray-900/0 opacity-0'}`}
      onClick={onClose}
    >
      <div
        className={`
          fixed top-0 right-0 w-full md:w-2/5 lg:w-[500px] h-full bg-white shadow-2xl
          transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${animate ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-medium italic text-gray-800">Create a New Ad</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 p-1">
            <CloseIcon />
          </button>
        </div>

        <div className="p-6 overflow-y-auto h-[calc(100%-100px)] space-y-6">
          {/* Ad Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Ad Title *</label>
            <input name="title" value={formData.title} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF]" placeholder="Example: Bright 3-room apartment" />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF] resize-none" placeholder="Describe your property..." />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Address *</label>
            <input name="address" value={formData.address} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF]" placeholder="Full Address" />
          </div>

          {/* Display Address & Exact Address Checkbox */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Display Address</label>
            <input name="display_address" value={formData.display_address} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF]" placeholder="Publicly visible address" />
            <label className="flex items-center space-x-2 mt-3 cursor-pointer">
              <input type="checkbox" name="show_exact_address" checked={formData.show_exact_address} onChange={handleInputChange} className="w-4 h-4 text-[#1077FF] rounded focus:ring-[#1077FF]" />
              <span className="text-sm text-gray-700">Show exact address publicly</span>
            </label>
          </div>

          {/* City & Postal Code */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">City *</label>
              <input name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF]" placeholder="City" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Postal code</label>
              <input name="postal_code" value={formData.postal_code} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF]" placeholder="Postal Code" />
            </div>
          </div>

          {/* Property & Rental Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Property Type</label>
              <select name="property_type" value={formData.property_type} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF]">
                <option value="studio">Studio</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Rental Type</label>
              <select name="rental_type" value={formData.rental_type} onChange={(e) => {
                const val = e.target.value;
                setFormData(prev => ({ ...prev, rental_type: val, furnished: val === "furnished" }));
              }} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF]">
                <option value="furnished">Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>
          </div>

          {/* Financials */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Rent / month (€) *</label>
              <input type="text" name="rent" value={formData.rent} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Security Deposit (€)</label>
              <input type="text" name="deposit" value={formData.deposit} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Monthly Charges (€)</label>
              <input type="text" name="monthly_charges" value={formData.monthly_charges} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF]" />
            </div>
            <div className="flex items-center pt-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" name="rent_guarantee_insurance" checked={formData.rent_guarantee_insurance} onChange={handleInputChange} className="w-5 h-5 text-[#1077FF] rounded focus:ring-[#1077FF]" />
                <span className="text-sm font-medium text-gray-700">Rent guarantee insurance</span>
              </label>
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Area (m²)</label>
              <input type="number" name="surface_sqm" value={formData.surface_sqm === 0 ? "" : formData.surface_sqm} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Floor</label>
              <input type="number" name="floor" value={formData.floor === 0 ? "" : formData.floor} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Total Rooms</label>
              <input type="number" name="rooms" value={formData.rooms === 0 ? "" : formData.rooms} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Total Pieces</label>
              <input type="number" name="pieces" value={formData.pieces === 0 ? "" : formData.pieces} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Bedrooms</label>
              <input type="number" name="bedrooms" value={formData.bedrooms === 0 ? "" : formData.bedrooms} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Bathrooms</label>
              <input type="number" name="bathrooms" value={formData.bathrooms === 0 ? "" : formData.bathrooms} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Built Year</label>
              <input type="number" name="built_year" value={formData.built_year === 0 ? "" : formData.built_year} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Orientation</label>
              <select name="orientation" value={formData.orientation} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF]">
                <option value="north">North</option>
                <option value="south">South</option>
                <option value="east">East</option>
                <option value="west">West</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Available from *</label>
            <input name="available_from" value={formData.available_from} onChange={handleInputChange} type="date" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF]" />
          </div>

          {/* Energy Performance (DPE/GHG) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">DPE (Energy)</label>
              <select name="dpe" value={formData.dpe} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF]">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">GHG (Emissions)</label>
              <select name="ghg" value={formData.ghg} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF]">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
              </select>
            </div>
          </div>

          {/* Photos */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Photos of the property</label>

            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                    <img src={URL.createObjectURL(img)} alt={`upload preview ${idx}`} className="w-full h-full object-cover object-center" />
                    <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-black/70 hover:bg-black text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <CloseIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#1077FF] transition-colors relative">
              <input type="file" multiple accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className="flex flex-col items-center">
                <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-gray-600 font-medium">Drag & Drop your files</p>
                <p className="text-[#1077FF] font-semibold mt-1">Browse file</p>
              </div>
            </div>
          </div>

          {/* Equipment */}
          <div className="pb-16">
            <label className="block text-sm font-semibold text-gray-700 mb-4">Equipment & Services</label>
            <div className="grid grid-cols-2 gap-4">
              {CONSTANT_EQUIPMENT.map((item) => (
                <label key={item} className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" checked={formData.service_tags.includes(item)} onChange={(e) => handleEquipmentChange(item, e.target.checked)} className="w-5 h-5 text-[#1077FF] rounded focus:ring-[#1077FF]" />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between space-x-4">
            <button onClick={onClose} disabled={isLoading} className="w-full px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60">
              CANCEL
            </button>
            <button onClick={handleCreateAd} disabled={isLoading} className="relative w-full px-6 py-3 bg-[#1077FF] text-white rounded-xl font-semibold hover:bg-[#0e66e6] transition-colors disabled:opacity-80 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Creating...
                </>
              ) : 'CREATE THE AD'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Hero Section ---
const HeroSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handlePostAdClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      setIsModalOpen(true);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div>
      <Toaster />
      {/* Hero Section */}
      <div className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[650px] overflow-hidden border-blue-600 rounded-2xl">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-r from-black/40 to-transparent">
            <img src={bgImg} alt="Modern architecture building" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="relative px-6 sm:px-10 lg:px-20 pt-16 sm:pt-20 lg:pt-24 pb-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="text-white">
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-6">
                Your Property <br /> <span className="larken-font font-light">Management</span>
                <br />
                <span className="italic font-light"> 100% Free</span>
              </h1>
              <p className="text-base sm:text-lg text-white/90 mb-8 max-w-lg">
                Access a directory of pre-qualified candidates, view their complete files and securely select the ideal tenant.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handlePostAdClick}
                  className="px-6 py-4 uppercase bg-white text-[#1077FF] rounded-xl font-semibold text-[15px] hover:bg-white/95 transition-colors"
                >
                  Post an ad
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Required Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center animate-pulse">
            <div className="mb-6">
              <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <CircleUser className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">You must be logged in</h3>
            <p className="text-gray-600 mb-8">Please log in to continue with your application.</p>
            <div className="flex gap-4">
              <button onClick={() => navigate("/login")} className="flex-1 bg-[#061251] text-white py-3 rounded-xl font-medium hover:bg-[#050f3a] transition-colors">
                Go to Login
              </button>
              <button onClick={() => setShowLoginModal(false)} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ad Creation Modal */}
      <AdModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setShowSuccessModal(true)}
      />

      {/* Success Modal */}
      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </div>
  );
};

export default HeroSection;