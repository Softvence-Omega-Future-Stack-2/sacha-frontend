import { useState } from "react";
import { CheckCircle, Eye, EyeOff } from "lucide-react"; // Home icon for the logo, Eye/EyeOff for password toggle

import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/main-logo.png";
import { useResetPasswordMutation } from "../../redux/featuresAPI/auth/auth.api";

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

// --- Toast Notification Component ---
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

// --- Password Field Component ---
interface PasswordFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ label, name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPassword ? "text" : "password";

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="text-gray-700 text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          placeholder="••••••••••••••••"
          value={value}
          onChange={onChange}
          // Matching the visual style of the image (no shadow on the input field itself)
          className={`w-full border border-gray-300 focus:outline-none rounded-lg p-2.5 text-sm text-gray-800 placeholder-gray-400 transition-all pl-3 focus:border-blue-500`}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {/* Using Eye/EyeOff for standard password visibility toggle */}
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};


// --- Main Create New Password Component (App) ---
const Rightside = () => {
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });

  // Removed dummyOtp and related useEffect since they are for OTP screen

  const navigate = useNavigate();
  const location = useLocation();

  // Get reset token from state or localStorage
  const reset_token = location.state?.token || localStorage.getItem("resetToken") || "";

  const showToast = (message: string, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { newPassword, confirmPassword } = passwords;

    if (!newPassword || !confirmPassword) {
      showToast("Both password fields are required.", "error");
      return;
    }

    if (newPassword.length < 8) {
      showToast("Password must be at least 8 characters long.", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("The passwords do not match.", "error");
      return;
    }

    if (!reset_token) {
      showToast("Reset session expired. Please restart the forgot password process.", "error");
      setTimeout(() => navigate("/forgate-password"), 2000);
      return;
    }

    try {
      const response = await resetPassword({
        reset_token,
        new_password: newPassword,
      }).unwrap();

      showToast(response?.message || "Password updated successfully!", "success");

      // Clear token on success
      localStorage.removeItem("resetToken");

      setTimeout(() => {
        navigate("/reset-successfull");
      }, 1500);
    } catch (error: any) {
      console.error("Password Reset Error:", error);
      const errMsg =
        error?.data?.message ||
        error?.data?.detail ||
        "Failed to reset password. Please try again.";
      showToast(errMsg, "error");
    }
  };

  // Removed handleResendOtp since it is for OTP screen


  return (
    <div className="flex justify-center items-center min-h-screen p-4 ">
      {/* Toast Render */}
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
        />
      )}

      <div className="w-full max-w-lg rounded-xl  p-7 md:p-10">
        {/* Header (Matching HelloAppart style) */}
        <div className="text-center lg:text-left mb-8">
          <div className="flex justify-center lg:justify-start">
            <img src={logo} alt="Main Logo" className="h-10 w-auto" />
          </div>

          {/* Title updated */}
          <h1 className="text-3xl font-medium text-[#061251] mt-4">Create New Password</h1>

          {/* Description updated */}
          <p className="text-sm text-gray-500 mt-1 lg:text-left">
            Please set up a new password for your account. It should be strong and unique.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Choose Password Field */}
          <PasswordField
            label="Choose Password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
          />

          {/* Confirm Password Field */}
          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
          />

          {/* --- Submit Button (Updated text and style to match image) --- */}
          <button
            type="submit"
            disabled={isLoading || !passwords.newPassword || !passwords.confirmPassword}
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
              "Save New Password"
            )}
          </button>
        </form>

        {/* --- Footer Links removed as per image design --- */}
      </div>
    </div>
  );
};

export default Rightside;