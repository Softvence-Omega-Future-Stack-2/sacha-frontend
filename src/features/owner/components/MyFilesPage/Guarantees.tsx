import React, { useState } from "react";
import Spouse from "./Spouse";

// গ্যারান্টি নির্বাচনের ধরন
type GuaranteeType = "person" | "organization" | "legal";

// পেশাগত পরিস্থিতি অপশন
const professionalSituations = [
  "Select professional situation",
  "Employee (Permanent Contract - CDI)",
  "Employee (Fixed-Term Contract - CDD)",
  "Student (Domestic)",
  "Student (International)",
  "Self-Employed / Freelancer",
  "Entrepreneur / Business Owner",
  "Retired",
  "Unemployed / Seeking Employment",
  "Civil Servant / Public Sector",
];

// ফ্লাগ অপশন
const phoneFlags = [
  { code: "US", flagUrl: "https://flagcdn.com/us.svg", dialCode: "+1" },
  { code: "IN", flagUrl: "https://flagcdn.com/in.svg", dialCode: "+91" },
  { code: "BD", flagUrl: "https://flagcdn.com/bd.svg", dialCode: "+880" },
  { code: "FR", flagUrl: "https://flagcdn.com/fr.svg", dialCode: "+33" },
];

// Toast Component for success messages
const Toast: React.FC<{ message: string; onClose: () => void }> = ({
  message,
  onClose,
}) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    // Added animation utility class for better visual feedback
    <div className="fixed bottom-8 right-8 z-50 animate-fade-in-up">
      <div className="flex items-center gap-3 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl">
        {/* Checkmark icon for success */}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

// Mock Flag Selector Component (simplified for single file)
const FlagSelector: React.FC = () => {
  const [selectedFlag, setSelectedFlag] = useState(phoneFlags[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle dropdown
  const handleFlagChange = (flag: (typeof phoneFlags)[0]) => {
    setSelectedFlag(flag);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative z-10">
      {/* Display Button */}
      <button
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="inline-flex items-center px-3 py-3 border border-r-0 border-gray-300 rounded-l-xl bg-gray-50 cursor-pointer hover:bg-gray-100 transition duration-150 focus:outline-none "
      >
        <img
          src={selectedFlag.flagUrl}
          alt={selectedFlag.code}
          className="w-6 h-4 rounded-sm shadow-sm"
        />
        <span className="ml-2 text-gray-600 text-sm font-medium">
          {selectedFlag.dialCode}
        </span>
        <span className="ml-2 text-gray-600 text-xs">▼</span>
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 mt-1 w-48 rounded-xl shadow-xl bg-white border border-gray-200 py-1 max-h-48 overflow-y-auto">
          {phoneFlags.map((flag) => (
            <button
              key={flag.code}
              onClick={() => handleFlagChange(flag)}
              className="w-full text-left flex items-center gap-3 px-4 py-2 hover:bg-blue-50 text-gray-800 transition duration-100"
            >
              <img
                src={flag.flagUrl}
                alt={flag.code}
                className="w-6 h-4 rounded-sm shadow-sm"
              />
              <span className="text-sm">
                {flag.dialCode} ({flag.code})
              </span>
              {selectedFlag.code === flag.code && (
                <svg
                  className="w-4 h-4 ml-auto text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function GuaranteeForm() {
  const [type, setType] = useState<GuaranteeType>("person");
  const [orgSubtype, setOrgSubtype] = useState<"visale" | "other">("visale");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Placeholder function for form submission
  const handleSubmit = () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      setShowToast(true);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-start pt-8">
      {/* Main form container, constrained on large screens and fully responsive */}
      <div className="w-full bg-white rounded-2xl  border border-gray-100 p-4 md:p-4">
        <div className="w-full flex justify-between     px-4 sm:px-6 lg:px-4 py-6 sm:py-6">
          {/* Title - Always Centered */}
          <h2 className="text-2xl sm:text-3xl font-medium text-[#061251] text-center mb-10 sm:mb-14">
            Guarantee
          </h2>

          {/* Buttons Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
            {[
              {
                id: "person",
                label: "A natural person",
                example: "e.g., a family member or friend",
              },
              {
                id: "organization",
                label: "An organization",
                example: "e.g., Visale or state funds",
              },
              {
                id: "legal",
                label: "A legal entity",
                example: "e.g., a company or non-profit",
              },
            ].map((item) => {
              const isActive = type === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setType(item.id as GuaranteeType)}
                  className={`
            group w-full flex flex-col p-6 rounded-2xl border-2 transition-all duration-300 text-left
            ${isActive
                      ? "border-blue-600 bg-blue-50 shadow-lg ring-2 ring-blue-200 ring-offset-2 scale-[1.02]"
                      : "border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50 hover:shadow-md"
                    }
          `}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0
                ${isActive
                          ? "border-blue-600 bg-blue-600"
                          : "border-gray-400 group-hover:border-blue-500"
                        }
              `}
                    >
                      {isActive && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>

                    <span
                      className={`
                font-semibold text-lg sm:text-xl transition-colors
                ${isActive
                          ? "text-blue-700"
                          : "text-gray-900 group-hover:text-gray-700"
                        }
              `}
                    >
                      {item.label}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-gray-500">
                    {item.example}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* PERSON FORM - Fully responsive grid */}
        {type === "person" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label
                  htmlFor="person-first-name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First name
                </label>
                <input
                  id="person-first-name"
                  type="text"
                  defaultValue="Asibul"
                  placeholder="Enter first name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none  transition duration-150"
                />
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="person-last-name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Last name
                </label>
                <input
                  id="person-last-name"
                  type="text"
                  defaultValue="Asikl"
                  placeholder="Enter last name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none  transition duration-150"
                />
              </div>

              {/* E-mail */}
              <div>
                <label
                  htmlFor="person-email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  E-mail
                </label>
                <input
                  id="person-email"
                  type="email"
                  defaultValue="username@gmail.com"
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none  transition duration-150"
                />
              </div>

              {/* Phone - Replaced static flag with FlagSelector component */}
              <div>
                <label
                  htmlFor="person-phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone
                </label>
                <div className="flex w-full">
                  <FlagSelector />
                  <input
                    id="person-phone"
                    type="tel"
                    defaultValue="1234"
                    placeholder="Enter phone number"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-r-xl focus:outline-none  transition duration-150"
                  />
                </div>
              </div>

              {/* Professional situation (Styled Dropdown) */}
              <div>
                <label
                  htmlFor="person-situation"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Professional situation
                </label>
                <select
                  id="person-situation"
                  // State to track selected value for dynamic class application (though options styling is limited)
                  defaultValue={professionalSituations[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10 cursor-pointer transition duration-150 text-gray-500 font-medium"
                  // Updated appearance for a cleaner look with a custom arrow
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1em",
                  }}
                >
                  {professionalSituations.map((situation, index) => (
                    <option
                      key={index}
                      value={situation}
                      disabled={index === 0}
                      // Styling the option's text color based on if it's the placeholder
                      className={`${index === 0 ? "text-gray-400" : "text-gray-900"
                        }`}
                    >
                      {situation}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  This status is crucial for determining guarantee eligibility.
                </p>
              </div>

              {/* Net monthly income */}
              <div>
                <label
                  htmlFor="person-income"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Net monthly income
                </label>
                <div className="relative">
                  <input
                    id="person-income"
                    type="number"
                    placeholder="e.g., 3000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 pr-12 transition duration-150"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    €
                  </span>
                </div>
              </div>

            </div>

            <div className="mt-2 pt-6 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`min-w-[220px] px-8 py-4 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-3 text-[14px]
                            ${loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-[#256AF4] hover:bg-blue-700 "
                  }
                        `}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    <span>Adding Guarantee...</span>
                  </>
                ) : (
                  "ADD THIS GUARANTEE"
                )}
              </button>
            </div>

            <Spouse />
          </>




        )}

        {/* ORGANIZATION FORM */}
        {type === "organization" && (
          <>  <div className="space-y-8 p-4 border border-gray-200 rounded-xl bg-gray-50">
            <p className="text-gray-600 text-sm">
              Please specify the type of third-party organization providing the
              guarantee.
            </p>
            <div className="flex flex-wrap gap-4">
              {["Visale", "Other organization"].map((label) => (
                <button
                  key={label}
                  onClick={() =>
                    setOrgSubtype(label === "Visale" ? "visale" : "other")
                  }
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl border transition-all duration-200 shadow-sm
                                        ${(
                      label === "Visale"
                        ? orgSubtype === "visale"
                        : orgSubtype === "other"
                    )
                      ? "border-blue-600 bg-white ring-2 ring-blue-500"
                      : "border-gray-300 bg-white hover:bg-gray-100"
                    }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                                            ${(
                        label === "Visale"
                          ? orgSubtype === "visale"
                          : orgSubtype === "other"
                      )
                        ? "border-blue-600 bg-blue-600"
                        : "border-gray-400"
                      }`}
                  >
                    {(label === "Visale"
                      ? orgSubtype === "visale"
                      : orgSubtype === "other") && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full" />
                      )}
                  </div>
                  <span className="font-medium text-gray-900">{label}</span>
                </button>
              ))}
            </div>
          </div>
            {/* Submit Button with Loading State */}
            <div className="mt-2 pt-6 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`min-w-[220px] px-8 py-4 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-3 text-[14px]
                            ${loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-[#256AF4] hover:bg-blue-700 "
                  }
                        `}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    <span>Adding Guarantee...</span>
                  </>
                ) : (
                  "ADD THIS GUARANTEE"
                )}
              </button>
            </div>
          </>

        )}

        {/* LEGAL ENTITY FORM - Fully responsive grid */}
        {type === "legal" && (
          <>
            <div className="space-y-10">
              {/* Identity of the legal entity */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#646492] pb-2">
                  Identity of the legal entity
                </h3>
                <label
                  htmlFor="legal-name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name of the legal entity
                </label>
                <input
                  id="legal-name"
                  type="text"
                  defaultValue="Example Corp LLC"
                  placeholder="Enter legal entity name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none  transition duration-150"
                />
              </div>

              {/* Representative's identity */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 pb-2">
                  Representative's Identity
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="rep-first-name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      First name
                    </label>
                    <input
                      id="rep-first-name"
                      type="text"
                      defaultValue="John"
                      placeholder="Representative's first name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none transition duration-150"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="rep-last-name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Last name
                    </label>
                    <input
                      id="rep-last-name"
                      type="text"
                      defaultValue="Doe"
                      placeholder="Representative's last name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none  transition duration-150"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 pt-6 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`min-w-[220px] px-8 py-4 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-3 text-[14px]
                            ${loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-[#256AF4] hover:bg-blue-700 "
                  }
                        `}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    <span>Adding Guarantee...</span>
                  </>
                ) : (
                  "ADD THIS GUARANTEE"
                )}
              </button>
            </div>
          </>

        )}


      </div>

      {/* Toast Component */}
      {showToast && (
        <Toast
          message="Guarantee added successfully!"
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Added a simple keyframe animation for the toast */}
      <style>{`
                @keyframes slide-in-up {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-fade-in-up {
                    animation: slide-in-up 0.5s ease-out forwards;
                }
            `}</style>
    </div>
  );
}
