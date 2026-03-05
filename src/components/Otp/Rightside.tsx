import { useState, useRef, useMemo, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/main-logo.png";
import { useVerifyOTPMutation, useVerifyPasswordForgetOTPMutation } from "../../redux/featuresAPI/auth/auth.api";

// Spinner Component
const Spinner = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

// Toast Component
const Toast = ({ message, type, onClose }: { message: string; type: string; onClose: () => void }) => {
  const baseClasses = "fixed top-5 right-5 z-50 p-4 rounded-lg shadow-xl text-white flex items-center transition-opacity duration-300";
  const bgColor = type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-gray-700";

  return (
    <div className={`${baseClasses} ${bgColor}`}>
      <CheckCircle size={20} className="mr-2" />
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-white opacity-80 hover:opacity-100 font-bold text-lg">
        &times;
      </button>
    </div>
  );
};

const Otp = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });
  const [verifyOTP, { isLoading: isVerifyLoading }] = useVerifyOTPMutation();
  const [verifyPasswordForgetOTP, { isLoading: isForgotLoading }] = useVerifyPasswordForgetOTPMutation();

  const isLoading = isVerifyLoading || isForgotLoading;

  const navigate = useNavigate();
  const location = useLocation();

  // Get email and mode from previous page state or localStorage
  const email = location.state?.email || localStorage.getItem("userEmail") || "";
  const mode = location.state?.mode || localStorage.getItem("otpMode") || "registration";

  // Properly typed ref using a generic HTMLInputElement[]
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 5000);
  };

  useEffect(() => {
    if (!email) {
      showToast("Session expired. Please try again.", "error");
      const redirectPath = mode === "forgot_password" ? "/forgate-password" : "/create-account";
      setTimeout(() => navigate(redirectPath), 2000);
    }
  }, [email, navigate, mode]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const fullOtp = useMemo(() => otp.join(''), [otp]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (fullOtp.length !== 6) {
      showToast("Please enter the full 6-digit OTP.", "error");
      return;
    }

    if (!email) {
      showToast("Missing email. Please try again.", "error");
      return;
    }

    try {
      let response;
      if (mode === "forgot_password") {
        response = await verifyPasswordForgetOTP({ email, otp: fullOtp }).unwrap();
      } else {
        response = await verifyOTP({ email, otp: fullOtp }).unwrap();
      }

      showToast(response?.message || "OTP verified successfully!", "success");

      // Clear transition data on success
      localStorage.removeItem("userEmail");
      localStorage.removeItem("otpMode");

      // Store reset token for the next step if in forgot_password mode
      if (mode === "forgot_password" && response.reset_token) {
        localStorage.setItem("resetToken", response.reset_token);
      }

      // Navigate based on mode
      const nextPath = mode === "forgot_password" ? "/create-new-password" : "/login";
      setTimeout(() => navigate(nextPath, { state: { token: response.reset_token } }), 1500);
    } catch (error: any) {
      console.error("OTP Verification Error:", error);
      const errMsg =
        error?.data?.message ||
        error?.data?.detail ||
        error?.data?.non_field_errors?.[0] ||
        "Verification failed. Please check your OTP and try again.";
      showToast(errMsg, "error");
    }
  };

  const handleResendOtp = () => {
    // Note: You might want to call registerClient again to resend OTP
    showToast("Resend OTP functionality will be triggered here.", "info");
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(prev => ({ ...prev, visible: false }))}
        />
      )}

      <div className="w-full max-w-lg rounded-xl p-7 md:p-10">
        <div className="text-center lg:text-left mb-8">
          <div className="flex justify-center lg:justify-start">
            <img src={logo} alt="Main Logo" className="h-10 w-auto" />
          </div>
          <h1 className="text-3xl font-medium text-[#061251] mt-4">OTP</h1>
          <p className="text-sm text-gray-500 mt-1 lg:text-left">
            Please enter the Six digit One time password we sent to your email to confirm its you
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="flex justify-between space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                // Fixed: Proper ref assignment with null check
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                inputMode="numeric"
                pattern="[0-9]"
                autoFocus={index === 0}
                className="w-1/6 h-14 text-3xl text-center border border-gray-300 rounded-lg focus:outline-none transition-all font-bold text-gray-800"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || fullOtp.length !== 6}
            className={`w-full text-white py-3 rounded-lg uppercase font-semibold text-base tracking-wider transition-colors flex items-center justify-center transform active:scale-[0.99]
              ${isLoading || fullOtp.length !== 6
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-blue-300/50"
              }`}
          >
            {isLoading ? (
              <>
                <Spinner />
                Please wait...
              </>
            ) : (
              "Submit OTP"
            )}
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
          <p className="text-gray-600 mb-1">Did not receive OTP?</p>
          <button onClick={handleResendOtp} className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
            Send OTP Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;