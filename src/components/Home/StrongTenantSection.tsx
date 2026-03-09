import React, { useState } from 'react';
import { Rocket, CircleUser } from 'lucide-react';
import img from '../../assets/strong-tenant.png';
import { useNavigate } from "react-router-dom";

const StrongTenantSection: React.FC = () => {

  // Login status check (same logic as Navbar)
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Modal state
  const [showLoginModal, setShowLoginModal] = useState(false);
  // Loader state for button
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleCtaClick = () => {
    if (!isLoggedIn) {
      setIsLoading(true);
      setShowLoginModal(true);
      // Turn off loader after modal appears
      setTimeout(() => setIsLoading(false), 300);
    } else {
      setIsLoading(true);
      navigate("/");
      // Optional: turn off loader after navigation (safe delay)
      setTimeout(() => setIsLoading(false), 600);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            {/* Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e8ecf4] text-[#1a1a4d] rounded-full text-sm font-medium">
                <Rocket className="w-4 h-4" />
                Performance
              </span>
            </div>

            {/* Heading */}
            <h1 className=" sm:text-2xl lg:text-4xl text-[#061251]  font-dm-sans text-3xl font-semibold leading-[120%] capitalize">
              Forte <span className="text-[#061251] larken-font font-normal leading-[120%]">Tenant Record</span>
            </h1>

            {/* Description */}
            <p className="text-xl text-[#1a1a4d] mb-6 leading-relaxed">
              Votre candidature, claire et convaincante, en seulement <br /> quelques minutes.
            </p>

            {/* CTA Button with Loader */}
            <button
              onClick={handleCtaClick}
              disabled={isLoading}
              className="relative cursor-pointer bg-[#0d6efd] hover:bg-[#0b5ed7] text-white text-base px-22 py-3.5 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Chargement...</span>
                </div>
              ) : (
                "Créer mon dossier"
              )}
            </button>
          </div>

          {/* Right Column - Cards */}
          <div className="relative">
            <div className="relative p-8 space-y-6">
              <img src={img} alt="Strong Tenant" />
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
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Vous devez être connecté</h3>
            <p className="text-gray-600 mb-8">Veuillez vous connecter pour continuer avec votre demande.</p>
            <div className="flex gap-4">
              <button onClick={() => navigate("/login")} className="flex-1 bg-[#061251] text-white py-3 rounded-xl font-medium hover:bg-[#050f3a] transition-colors">
                Se connecter
              </button>
              <button onClick={() => setShowLoginModal(false)} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrongTenantSection;