import { useState } from "react";
import { CheckCircle } from "lucide-react"; // Home icon for the logo
import logo from "../../assets/main-logo.png";

import { useNavigate } from "react-router-dom";

// --- Spinner/Loader Component ---
const Spinner = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

// --- Toast Notification Component (Kept for general utility) ---
const Toast = ({ message, type, onClose }: { message: string; type: string; onClose: () => void }) => {
  const baseClasses =
    "fixed top-5 right-5 z-50 p-4 rounded-lg shadow-xl text-white flex items-center transition-opacity duration-300";
  let classes = "";

  if (type === "success") {
    classes = "bg-green-500";
  } else if (type === "error") {
    classes = "bg-red-500";
  } else {
    // Default to a neutral color
    classes = "bg-gray-700"; 
  }

  return (
    <div className={`${baseClasses} ${classes}`}>
      <CheckCircle size={20} className="mr-2" />
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-white opacity-80 hover:opacity-100 font-bold text-lg"
      >
        &times;
      </button>
    </div>
  );
};

// --- Password Field Component (Removed as it's no longer used) ---


// --- Main Password Reset Success Component (App) ---
const Rightside = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });
  
  const showToast = (message: string, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 4000);
  };
  const navigate = useNavigate();
  // Dummy function for navigation
  const handleBackToHome = async () => {
    setIsLoading(true);
    // Simulate navigation delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    showToast("Navigating back to Lpoin...", "info");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    navigate("/login");

    console.log("Navigating to Login.");
  };


  return (
    <div className="flex justify-center items-center min-h-screen p-4 "> {/* Changed background to white to match image */}
      {/* Toast Render */}
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
        />
      )}

      <div className="w-full max-w-lg  p-7 md:p-10"> {/* Removed shadow/rounded-xl since the page is mostly clean white */}
        {/* Header (Matching HelloAppart style) */}
        <div className="text-left mb-12"> {/* Adjusted margin for title alignment */}
            <div className="flex justify-center lg:justify-start">
            <img src={logo} alt="Main Logo" className="h-10 w-auto" />
          </div>

          {/* Title updated */}
          <h1 className="text-4xl font-semibold text-[#061251] mt-4 mb-4">Password Reset Successful</h1>
          
          {/* Description updated */}
          <p className="text-base text-gray-700 font-normal">
            Your password has been changed successfully. You can now log in with your new credentials.
          </p>
        </div>

        {/* --- Back to Home Button --- */}
        <button
          onClick={handleBackToHome}
          disabled={isLoading} 
          className={`w-full text-white py-3 rounded-lg uppercase font-semibold text-base tracking-wider transition-colors flex items-center justify-center transform active:scale-[0.99]
            ${isLoading 
              ? "bg-blue-400 cursor-not-allowed" // Lighter color when loading/disabled
              : "bg-blue-600 hover:bg-blue-700 shadow-blue-300/50"
            }`}
        >
          {isLoading ? (
            <>
              <Spinner />
              Please wait...
            </>
          ) : (
            "Back To Login"
          )}
        </button>

      </div>
    </div>
  );
};

export default Rightside;