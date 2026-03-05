import { useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react"; // Added CheckCircle for success icon

import { useNavigate } from "react-router-dom";

import logo from "../../assets/main-logo.png";
import { useRequestPasswordResetOTPMutation } from "../../redux/featuresAPI/auth/auth.api";

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
const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: string;
  onClose: () => void;
}) => {
  const baseClasses =
    "fixed top-5 right-5 z-50 p-4 rounded-lg shadow-xl text-white flex items-center transition-opacity duration-300";
  let classes = "";

  if (type === "success") {
    classes = "bg-green-500";
  } else if (type === "error") {
    classes = "bg-red-500";
  } else {
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

interface InputFieldProps {
  label: string;
  placeholder: string;
  type?: "text" | "email" | "password" | "tel" | "number";
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  isPhone?: boolean;
  name: string;
}

// --- InputField Component (No changes needed, included for completeness) ---
const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  isPassword = false,
  isPhone = false,
  name,
}) => {
  // Fixes the implicit 'any' type error by defining the InputFieldProps interface.

  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  if (isPhone) {
    return (
      <div className="space-y-1">
        <label htmlFor={name} className="text-gray-700 text-sm font-medium">
          {label}
        </label>
        <div className="flex border border-gray-300 rounded-lg p-2.5 transition-all">
          <div className="flex items-center space-x-2 pr-2 border-r border-gray-300">
            {/* The flag URL is hardcoded as per the original component */}
            <img
              src="https://flagcdn.com/us.svg"
              alt="US Flag"
              className="w-4 h-3"
            />
            <span className="text-gray-700 text-xs">▼</span>
          </div>
          <input
            id={name}
            name={name}
            type="tel"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="flex-1 min-w-0 px-2 focus:outline-none text-sm text-gray-800 placeholder-gray-400"
          />
        </div>
      </div>
    );
  }

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
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full border border-gray-300 focus:outline-none rounded-lg p-2.5 text-sm text-gray-800 placeholder-gray-400 transition-all pl-3`}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

// --- Main Registration Form Component (Rightside) ---
const Rightside = () => {
  const [formData, setFormData] = useState<{
    email: string;
  }>({ email: "" });
  // const [isLoading, setIsLoading] = useState(false); // NEW: Loader state
  const [toast, setToast] = useState({ visible: false, message: "", type: "" }); // NEW: Toast state

  const handleChange = (e: {
    target: { name: any; value: any; type: any; checked: any };
  }) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const navigate = useNavigate();

  const [requestPasswordResetOTP, { isLoading }] = useRequestPasswordResetOTPMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await requestPasswordResetOTP({
        email: formData.email,
      }).unwrap();

      console.log("Forget Password Response:", response);

      // success toast
      setToast({
        visible: true,
        message: response.message || "Verification code sent!",
        type: "success",
      });

      // Store email and mode for OTP page persistence
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("otpMode", "forgot_password");

      // navigate to otp page
      setTimeout(() => {
        navigate("/otp", { state: { email: formData.email, mode: "forgot_password" } });
      }, 1500);
    } catch (error: any) {
      console.log("Forget Password Error:", error);

      let msg = "Something went wrong!";
      if (error?.data?.message) msg = error.data.message;

      setToast({
        visible: true,
        message: msg,
        type: "error",
      });
    }
  };



  return (
    <div className="flex justify-center items-center min-h-screen p-3">
      {/* Toast Render */}
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
        />
      )}

      <div className="w-full max-w-xl bg-white rounded-xl p-5 md:p-7">
        {/* Header */}
        <div className="text-center lg:text-left mb-6">
          <div className="flex justify-center lg:justify-start">
            <img src={logo} alt="Main Logo" className="h-10 w-auto" />
          </div>

          <h1 className="text-3xl font-medium text-[#061251] mt-4">
            Forget Password
          </h1>
          <p className="text-sm text-gray-500 mt-1 lg:text-left ">
            Enter your registered email or phone number. We’ll send you a
            verification code to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* --- Input Fields --- (Same as before) */}

          <InputField
            label="Email"
            name="email"
            placeholder="Enter your email or phone"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* --- Sign Up Button (Updated with Loader) --- */}
          <button
            type="submit"
            disabled={isLoading} // Disable button when loading
            className={`w-full text-white py-2.5 mt-3 rounded-lg uppercase font-semibold text-base transition-colors flex items-center justify-center ${isLoading
              ? "bg-blue-400 cursor-not-allowed" // Lighter color when loading/disabled
              : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {isLoading ? (
              <>
                <Spinner />
                Please wait...
              </>
            ) : (
              "Send Verification Code"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Rightside;
