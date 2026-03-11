// Rightside.tsx - Full Registration Page with Real Backend Connection
import { useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/main-logo.png";
import { useRegisterClientMutation } from "../../redux/featuresAPI/auth/auth.api";

// --------------------- Spinner Component ---------------------
const Spinner: React.FC = () => (
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

// --------------------- Toast Notification ---------------------
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
  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
        ? "bg-red-500"
        : "bg-gray-700";

  return (
    <div className={`${baseClasses} ${bgColor}`}>
      <CheckCircle size={20} className="mr-2" />
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-white opacity-80 hover:opacity-100 font-bold text-lg"
      >
        ×
      </button>
    </div>
  );
};

// --------------------- Reusable Input Field ---------------------
const InputField = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  isPassword = false,
  isPhone = false,
  name,
  error,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  isPhone?: boolean;
  name: string;
  error?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // --- Country Phone Dropdown Code ---
  const countries = [
    { name: "United States", code: "+1", flag: "https://flagcdn.com/us.svg" },
    { name: "United Kingdom", code: "+44", flag: "https://flagcdn.com/gb.svg" },
    { name: "France", code: "+33", flag: "https://flagcdn.com/fr.svg" },
    { name: "Germany", code: "+49", flag: "https://flagcdn.com/de.svg" },
    { name: "Bangladesh", code: "+880", flag: "https://flagcdn.com/bd.svg" },
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [open, setOpen] = useState(false);

  // phone field
  if (isPhone) {
    return (
      <div className="space-y-1 relative">
        <label htmlFor={name} className="text-gray-700 text-sm font-medium">
          {label}
        </label>

        <div
          className={`flex border rounded-lg p-2.5 relative ${error ? "border-red-500" : "border-gray-300"
            }`}
        >
          <div
            className="flex items-center space-x-2 pr-2 border-r border-gray-300 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <img src={selectedCountry.flag} alt="Flag" className="w-5 h-3" />
            <span className="text-gray-700 text-xs">
              {selectedCountry.code}
            </span>
            <span className="text-gray-700 text-xs">▼</span>
          </div>

          <input
            id={name}
            name={name}
            type="tel"
            placeholder={placeholder}
            value={value.startsWith(selectedCountry.code) ? value.slice(selectedCountry.code.length) : value}
            onChange={(e) => {
              const inputVal = e.target.value.replace(/\D/g, ""); // Keep only digits
              onChange({
                target: {
                  name,
                  value: selectedCountry.code + inputVal,
                },
              } as any);
            }}
            className="flex-1 px-2 focus:outline-none text-sm text-gray-800 placeholder-gray-400"
          />
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

        {open && (
          <ul className="absolute bg-white border border-gray-300 rounded-lg shadow-lg top-20 left-0 w-full z-50 max-h-40 overflow-y-auto">
            {countries.map((c) => (
              <li
                key={c.code}
                onClick={() => {
                  const currentNumber = value.startsWith(selectedCountry.code)
                    ? value.slice(selectedCountry.code.length)
                    : value.replace(/\D/g, "");
                  setSelectedCountry(c);
                  onChange({
                    target: { name, value: c.code + currentNumber },
                  } as any);
                  setOpen(false);
                }}
                className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <img src={c.flag} alt={c.name} className="w-5 h-3 mr-2" />
                <span className="text-sm">{c.name}</span>
                <span className="ml-auto text-xs text-gray-500">{c.code}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  // password OR normal field
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
          spellCheck={false}
          className={`w-full border rounded-lg p-2.5 text-sm text-gray-800 placeholder-gray-400 pl-3 focus:outline-none ${error ? "border-red-500" : "border-gray-300"
            }`}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

// --------------------- Role Selector Button ---------------------
const RoleButton = ({
  role,
  label,
  description,
  isSelected,
  onClick,
}: {
  role: "tenant" | "owner";
  label: string;
  description: string;
  isSelected: boolean;
  onClick: (role: "tenant" | "owner") => void;
}) => (
  <label
    onClick={() => onClick(role)}
    className={`flex flex-col items-start p-4 rounded-lg w-full text-left border-2 cursor-pointer transition-all ${isSelected
      ? "border-blue-600 bg-blue-50/50"
      : "border-gray-300 hover:border-blue-200"
      }`}
  >
    <div className="flex items-center">
      <div
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-2 transition-all ${isSelected ? "border-blue-600" : "border-gray-400"
          }`}
      >
        {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
      </div>
      <span className="font-semibold text-base text-gray-800">{label}</span>
    </div>
    <p className="text-xs text-gray-500 mt-1 pl-7">{description}</p>
  </label>
);

// --------------------- Main Registration Component ---------------------
const Rightside = () => {
  const navigate = useNavigate();
  const [registerClient, { isLoading }] = useRegisterClientMutation();

  const [userRole, setUserRole] = useState<"tenant" | "owner">("tenant");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    receiveNews: false,
  });

  // Validation Errors State
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: "",
  });

  const [toast, setToast] = useState({ visible: false, message: "", type: "" });

  // handle input
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // toast
  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 4000);
  };

  // Validation Logic
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: "",
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Phone validation (basic check)
    // Note: formData.phone might include country code.
    if (!formData.phone || formData.phone.length < 5) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    }

    // Password Validation
    // Must be uppercase, special character, number, 8 length
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else {
      if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
        isValid = false;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast("Veuillez corriger les erreurs dans le formulaire", "error");
      return;
    }

    const payload = {
      first_name: formData.firstName.trim(),
      last_name: formData.lastName.trim(),
      email: formData.email.trim(),
      phone_number: formData.phone.trim(),
      password: formData.password,
      password2: formData.confirmPassword,
      role: userRole,
    };


    try {
      await registerClient(payload).unwrap();
      showToast("Compte créé avec succès!", "success");
      setTimeout(() => navigate("/otp", { state: { email: formData.email.trim() } }), 1500);
    } catch (error: any) {
      if (error?.data) {
        setErrors((prev) => ({
          ...prev,
          firstName: error.data.first_name?.[0] || prev.firstName,
          lastName: error.data.last_name?.[0] || prev.lastName,
          email: error.data.email?.[0] || prev.email,
          phone: error.data.phone?.[0] || error.data.phone_number?.[0] || prev.phone,
          password: error.data.password?.[0] || prev.password,
        }));
      }

      const errMsg =
        error?.data?.detail ||
        error?.data?.non_field_errors?.[0] ||
        "Registration failed. Please try again.";
      showToast(errMsg, "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-3">
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
        />
      )}

      <div className="w-full max-w-xl bg-white rounded-xl p-5 md:p-7 shadow-lg">
        <div className="text-center lg:text-left mb-6">
          <div className="flex justify-center lg:justify-start">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </div>
          <h1 className="text-3xl font-medium text-[#061251] mt-4">
            Créez votre compte
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Créez votre profil sur My Appart et accédez aux locations ou aux locataires qui
            correspondent à vos critères en quelques clics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <RoleButton
            role="tenant"
            label="Je suis locataire"
            description="Et je cherche un logement à louer."
            isSelected={userRole === "tenant"}
            onClick={setUserRole}
          />
          <RoleButton
            role="owner"
            label="I Am The Owner"
            description="And I'm looking for a tenant."
            isSelected={userRole === "owner"}
            onClick={setUserRole}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InputField
              label="First Name"
              name="firstName"
              placeholder="eg: John"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
            <InputField
              label="Last Name"
              name="lastName"
              placeholder="eg: Deo"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
          </div>

          <InputField
            label="Email "
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          {/* UPDATED PHONE FIELD */}
          <InputField
            label="Phone"
            name="phone"
            placeholder="1234567890"
            isPhone
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />

          <InputField
            label="Choose Password"
            name="password"
            placeholder="**********"
            isPassword
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <InputField
            label="Confirm Password"
            name="confirmPassword"
            placeholder="**********"
            isPassword
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <div className="pt-1 space-y-2">
            <div className="flex items-start">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-blue-600 rounded"
              />
              <label
                htmlFor="acceptTerms"
                className="ml-3 text-xs text-gray-500"
              >
                I accept the{" "}
                <a href="#" className="text-blue-600 font-medium">
                  terms of use
                </a>{" "}
                and the{" "}
                <a href="#" className="text-blue-600 font-medium">
                  privacy policy
                </a>
                .
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-red-500 text-xs ml-7">{errors.acceptTerms}</p>
            )}

            <div className="flex items-center">
              <input
                id="receiveNews"
                name="receiveNews"
                type="checkbox"
                checked={formData.receiveNews}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label
                htmlFor="receiveNews"
                className="ml-3 text-xs text-gray-500"
              >
                I would like to receive HelloAppart news and offers
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white py-2.5 mt-3 rounded-lg font-semibold text-base flex items-center justify-center transition-colors ${isLoading
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
              "SIGN UP"
            )}
          </button>
        </form>

        <p className="text-center text-md text-gray-500 mt-4">
          Already have an account?
          <a
            href="/login"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Sign In!
          </a>
        </p>
      </div>
    </div>
  );
};

export default Rightside;
