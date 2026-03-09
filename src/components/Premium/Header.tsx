import { CheckCircle, CircleUser } from 'lucide-react';
import premium from '../../assets/Premium/premiun.png';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ApplyPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // État pour le futur modal "connexion requise"
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSubmit = () => {
    if (isLoading) return;

    // Vérifie si l'utilisateur est connecté
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!loggedIn) {
      // Pas connecté → on affiche le futur modal
      setShowLoginModal(true);
      return;
    }

    // Connecté → on continue vers le paiement
    setIsLoading(true);
    setTimeout(() => {
      navigate("/payment");
    }, 1500);
  };

  return (
    <>
      <div className="bg-gradient-to-b w-full from-blue-700/20 to-blue-700/20 py-8 px-4 sm:px-6 flex items-center justify-between">
        <div className="grid grid-cols-1 container mx-auto lg:grid-cols-2 gap-12 items-start">
          {/* Left Section */}
          <div className='lg:px-10'>
            <h1 className="text-3xl lg:text-5xl font-semibold text-[#061251] leading-tight mb-4">
              Demander <br />
              <span className="larken-font font-normal">Les appartements!</span>
            </h1>
            <p className="text-lg text-[#061251] mb-10">
              Devenez Premium et postulez à un nombre illimité d'offres !
            </p>

            {/* Features list */}
            <div className="space-y-6 mb-12">
              {[
                "Votre profil est envoyé aux propriétaires et ils vous contactent directement.",
                "Postulez à tous les appartements HelloAppart",
                "Vente 100 % privée, sans frais d'agence.",
                "Suivez vos candidatures en temps réel",
                "Publiez vos recherches"
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" aria-hidden="true" />
                  <p className="text-lg text-gray-800">{feature}</p>
                </div>
              ))}
            </div>

            {/* Small info boxes */}
            <div className="flex space-x-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1">
                <p className="text-4xl font-semibold text-blue-900">5X</p>
                <p className="text-[#061251]">Plus de chance</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1">
                <p className="text-4xl font-semibold text-blue-900">100%</p>
                <p className="text-[#061251]">Sécurisé</p>
              </div>
            </div>
          </div>

          {/* Right Section - Card */}
          <div className="bg-white p-8 lg:p-10 mt-4 rounded-3xl relative w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-gray-600 text-lg italic mb-1">Essayez pour</p>
                <p className="text-4xl font-bold text-gray-900">€9.90</p>
              </div>
              <div className="flex-shrink-0">
                <img src={premium} alt="Premium Plan" className="h-26 w-auto mb-2" />
              </div>
            </div>

            <p className="text-gray-700 text-lg mb-8">
              Aucun engagement requis, annulez à tout moment.
            </p>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full relative bg-[#256AF4] text-white py-4 px-6 rounded-xl text-xl font-normal transition-all duration-300 flex items-center justify-center ${isLoading
                ? 'opacity-90 cursor-not-allowed'
                : 'hover:bg-blue-700 shadow-[0_10px_80px_rgba(0,60,162,0.30)]'
                }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Traitement...
                </>
              ) : (
                "SOUMETTRE MA CANDIDATURE"
              )}
            </button>

            <div className="flex items-center mt-12 justify-center rounded-3xl p-3 bg-[rgba(37,99,235,0.10)] text-[#061251] mb-6">
              <p className='text-[13px] text-center'>
                400 personnes ont trouvé ce qu'elles cherchaient cette semaine
              </p>
            </div>

            <p className="text-center text-gray-500 text-sm">
              Une note de 4,8 sur 5 basée sur 1659 avis. Nos avis 4 et 5 étoiles.
            </p>
          </div>
        </div>
      </div>

      {/* Fix TS6133 : on "utilise" la variable sans rien afficher → zéro impact visuel */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center animate-pulse">
            <div className="mb-6">
              <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <CircleUser className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Vous devez être connecté</h3>
            <p className="text-gray-600 mb-8">Veuillez vous connecter pour continuer votre candidature.</p>
            <div className="flex gap-4">
              <button onClick={() => navigate("/login")} className="flex-1 bg-[#061251] text-white py-3 rounded-xl font-medium hover:bg-[#050f3a] transition-colors">
                Aller à la connexion
              </button>
              <button onClick={() => setShowLoginModal(false)} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default ApplyPage;