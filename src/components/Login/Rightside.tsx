import { useEffect, useState } from "react";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/featuresAPI/auth/auth.api";
import { setUser } from "../../redux/featuresAPI/auth/auth.slice";
import { useAppDispatch } from "../../redux/hooks";
import logo from "../../assets/main-logo.png";

// ---------------- Spinner ----------------
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

// ---------------- Toast Component ----------------
const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: string;
  onClose: () => void;
}) => {
  const Icon = type === "error" ? XCircle : CheckCircle;
  const color = type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <div
      className={`fixed top-5 right-5 z-50 p-4 rounded-lg shadow-xl text-white flex items-center ${color}`}
    >
      <Icon size={20} className="mr-2" />
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-white opacity-90 hover:opacity-100 font-bold text-lg"
      >
        ×
      </button>
    </div>
  );
};

// ---------------- InputField Component ----------------
const InputField = ({
  label,
  placeholder,
  type = "email",
  value,
  onChange,
  isPassword = false,
  name,
  required = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  name: string;
  required?: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

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
          required={required}
          className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-800 placeholder-gray-400 pl-3 focus:outline-none"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

// ---------------- Main Component ----------------
const Rightside = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    acceptTerms: false,
  });

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "",
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/dashboard-owner");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const showToast = (message: string, type: string) => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast((p) => ({ ...p, visible: false }));
    }, 3000);
  };

  // ---------------- Handle Login ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      console.log("Login Response Data:", response);

      if (response?.success && response?.user) {
        const { tokens, profile } = response.user;

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("accessToken", tokens.access);
        localStorage.setItem("refreshToken", tokens.refresh || "");
        localStorage.setItem("role", profile.role);
        localStorage.setItem("user", JSON.stringify(profile));

        // Dispatch response to redux (updated slice handles extraction)
        dispatch(setUser(response));

        showToast("Login successfully!", "success");
        console.log("Navigating to ", profile.role);

        // Navigate based on role
        setTimeout(() => {
          if (profile.role === "tenant") {
            navigate("/");
          } else if (profile.role === "owner") {
            navigate("/dashboard-owner");
          } else {
            navigate("/"); // Default fallback
          }
        }, 500);
      } else {
        showToast(response?.message || "Invalid response from server", "error");
      }
    } catch (error: any) {
      console.log("Login Error:", error);

      let msg = "Login failed. Please try again.";

      // Handle the specialized structure from the user request
      if (error?.data?.message) {
        msg = error.data.message;
      }
      else if (error?.data) {
        // Fallback to other possible structures
        if (error.data.detail) {
          msg = error.data.detail;
        } else if (error.data.non_field_errors) {
          msg = Array.isArray(error.data.non_field_errors)
            ? error.data.non_field_errors[0]
            : error.data.non_field_errors;
        } else {
          const firstErrorKey = Object.keys(error.data)[0];
          if (firstErrorKey) {
            const firstError = error.data[firstErrorKey];
            msg = Array.isArray(firstError) ? firstError[0] : firstError;
          }
        }
      } else if (error?.message) {
        msg = error.message;
      }

      showToast(msg, "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-3">
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((p) => ({ ...p, visible: false }))}
        />
      )}

      <div className="w-full max-w-xl bg-white rounded-xl p-6 md:p-8 shadow">
        <div className="text-center md:text-left mb-6">
          <img src={logo} className="h-10 mx-auto md:mx-0" />
          <h1 className="text-3xl font-medium text-[#061251] mt-4">Login</h1>
          <p className="text-sm text-gray-500">
            Log in to your account to resume your search
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            required
          />

          <InputField
            label="Password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            isPassword
            required
          />

          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="mr-2 w-4 h-4"
              />
              <span className="text-sm text-gray-600">Remember Me</span>
            </label>

            <a
              href="/forgate-password"
              className="text-sm text-[#1077FF] font-medium"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white py-3 rounded-lg font-semibold flex justify-center ${isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {isLoading ? (
              <>
                <Spinner />
                Please wait...
              </>
            ) : (
              "LOG IN"
            )}
          </button>
        </form>

        <p className="text-center mt-4 text-md text-[#646492]">
          Don't have an account?{" "}
          <a href="/create-account" className="text-[#1077FF]">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Rightside;
