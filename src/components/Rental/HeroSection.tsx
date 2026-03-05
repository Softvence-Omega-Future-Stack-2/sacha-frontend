import React, { useState } from 'react';
import bgImg from '../../assets/rental/bg-image.png';
import { CircleUser, CheckCircle2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";

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

const AdModal: React.FC<AdModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCreateAd = () => {
    if (isLoading) return;
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onClose();
      onSuccess();
    }, 1800);
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
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-medium italic text-gray-800">Create a New Ad</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 p-1">
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto h-[calc(100%-100px)]">

          {/* Ad Title */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Ad Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF] focus:border-transparent"
              placeholder="Example: Bright 3-room apartment"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF] focus:border-transparent resize-none"
              placeholder="Describe your property..."
            />
          </div>
                   {/* Address */}
          <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
              <input 
                  id="address"
                  type="text" 
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none" 
                  placeholder="Full Address" 
              />
          </div>

          {/* City and Postal Code */}
          <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                  <input type="text" id="city" className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none" placeholder="City" />
              </div>
              <div>
                  <label htmlFor="postal-code" className="block text-sm font-semibold text-gray-700 mb-1">Postal code</label>
                  <input type="text" id="postal-code" className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none" placeholder="Enter Postal Code" />
              </div>
          </div>

          {/* Price & Security Deposit */}
          <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                  <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-1">Price/month (€)</label>
                  <input type="number" id="price" defaultValue="1200" className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none" />
              </div>
              <div>
                  <label htmlFor="security-deposit" className="block text-sm font-semibold text-gray-700 mb-1">Security deposit (€)</label>
                  <input type="number" id="security-deposit" defaultValue="1200" className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none" />
              </div>
          </div>

          {/* Rooms & Bathrooms */}
          <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                  <label htmlFor="rooms" className="block text-sm font-semibold text-gray-700 mb-1">Rooms</label>
                  <select id="rooms" defaultValue="1" className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none appearance-none">
                      <option value="1">1</option>
                      <option value="2">2</option>
                  </select>
              </div>
              <div>
                  <label htmlFor="bathrooms" className="block text-sm font-semibold text-gray-700 mb-1">Bathrooms</label>
                  <select id="bathrooms" defaultValue="2" className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none appearance-none">
                      <option value="1">1</option>
                      <option value="2">2</option>
                  </select>
              </div>
          </div>

          {/* Total Pieces & Area */}
          <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                  <label htmlFor="total-pieces" className="block text-sm font-semibold text-gray-700 mb-1">Total Pieces</label>
                  <select id="total-pieces" defaultValue="2" className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none appearance-none">
                      <option value="1">1</option>
                      <option value="2">2</option>
                  </select>
              </div>
              <div>
                  <label htmlFor="area" className="block text-sm font-semibold text-gray-700 mb-1">Area (m²)</label>
                  <input type="number" id="area" defaultValue="50" className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none" />
              </div>
          </div>

          {/* Available from */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Available from</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF] focus:border-transparent"
            />
          </div>

          {/* Energy Performance Diagnosis (DPE) */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Energy Performance Diagnosis (DPE)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Energy efficiency class DPE</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF] focus:border-transparent appearance-none bg-white">
                  <option>Select a class</option>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
                  <option>E</option>
                  <option>F</option>
                  <option>G</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Consumption (kWh/m²/year)</label>
                <input
                  type="number"
                  defaultValue="50"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Greenhouse Gases (GHG) */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Greenhouse Gases (GHG)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GHG emission class</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF] focus:border-transparent appearance-none bg-white">
                  <option>Select a class</option>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
                  <option>E</option>
                  <option>F</option>
                  <option>G</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emission (kg CO2/m²/year)</label>
                <input
                  type="number"
                  defaultValue="50"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1077FF] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Photos of the property */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Photos of the property</label>

            <div id="photo-preview" className="grid grid-cols-3 gap-3 mb-4"></div>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#1077FF] transition-colors relative">
              <input
                type="file"
                multiple
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                id="property-photos"
                onChange={(e) => {
                  const files = e.target.files;
                  const previewContainer = document.getElementById('photo-preview');
                  if (!files || !previewContainer) return;

                  previewContainer.innerHTML = '';

                  Array.from(files).forEach((file) => {
                    if (file.type.startsWith('image/')) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        const div = document.createElement('div');
                        div.className = 'relative aspect-square rounded-lg overflow-hidden border border-gray-200 group';

                        const img = document.createElement('img');
                        img.src = ev.target?.result as string;
                        img.className = 'w-full h-full object-cover object-center';

                        const removeBtn = document.createElement('button');
                        removeBtn.type = 'button';
                        removeBtn.className = 'absolute top-1 right-1 bg-black/70 hover:bg-black text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity';
                        removeBtn.innerHTML = `
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        `;
                        removeBtn.onclick = (event) => {
                          event.stopPropagation();
                          div.remove();
                        };

                        div.appendChild(img);
                        div.appendChild(removeBtn);
                        previewContainer.appendChild(div);
                      };
                      reader.readAsDataURL(file);
                    }
                  });

                  e.target.value = '';
                }}
              />
              <label htmlFor="property-photos" className="cursor-pointer block">
                <div className="flex flex-col items-center">
                  <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-gray-600 font-medium">Drag & Drop your files</p>
                  <p className="text-gray-400 text-sm">Or</p>
                  <p className="text-[#1077FF] font-semibold mt-1">Browse file</p>
                </div>
              </label>
            </div>
          </div>

          {/* Equipment */}
          <div className="mb-18">
            <label className="block text-sm font-semibold text-gray-700 mb-4">Equipment</label>
            <div className="grid grid-cols-2 gap-4">
              {['WiFi', 'Terrace', 'Elevator', 'Air Conditioning', 'Parking', 'Garden', 'Dishwasher', 'Heating', 'Balcony', 'Cellar', 'Washing machine', 'Chimney'].map((item) => (
                <label key={item} className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 text-[#1077FF] rounded focus:ring-[#1077FF]" />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex justify-between space-x-4">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="w-full px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60"
            >
              CANCEL
            </button>

            <button
              onClick={handleCreateAd}
              disabled={isLoading}
              className="relative w-full px-6 py-3 bg-[#1077FF] text-white rounded-xl font-semibold hover:bg-[#0e66e6] transition-colors disabled:opacity-80 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'CREATE THE AD'
              )}
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