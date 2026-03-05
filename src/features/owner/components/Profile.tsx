// src/components/ProfileForm.tsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import userProfile from "../../../assets/dashboard/topBarWomanImg.jpg";
import TitleItaic from "./TitleItalic";
import DossierFacilePage from "./MyFilesPage/DossierFacile";
import GuaranteeForm from "./MyFilesPage/Guarantees";

const countries = [
  { code: "+1", flag: "us", name: "United States" },
  { code: "+44", flag: "gb", name: "United Kingdom" },
  { code: "+91", flag: "in", name: "India" },
  { code: "+880", flag: "bd", name: "Bangladesh" },
  { code: "+61", flag: "au", name: "Australia" },
  { code: "+81", flag: "jp", name: "Japan" },
  { code: "+49", flag: "de", name: "Germany" },
  { code: "+33", flag: "fr", name: "France" },
];

const professions = [
  "Employed",
  "Self-Employed",
  "Freelancer",
  "Business Owner",
  "Student",
  "Unemployed",
  "Retired",
  "Looking for opportunities",
];

const FormInput = ({ label, placeholder, name, type = "text" }: any) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-gray-800">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none transition"
    />
  </div>
);

const FormTextarea = ({ label, placeholder }: any) => (
  <div className="flex flex-col space-y-2 col-span-1 md:col-span-2">
    <label className="text-sm font-medium text-gray-800">{label}</label>
    <textarea
      placeholder={placeholder}
      rows={4}
      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none resize-none transition"
    />
  </div>
);

const ProfileForm: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectedProfession, setSelectedProfession] = useState("");
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isProfessionOpen, setIsProfessionOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAndContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Saved successfully!", {
        style: {
          background: "#10B981",
          color: "white",
          fontWeight: "600",
          borderRadius: "12px",
          padding: "16px 24px",
        },
      });

      // FIX: Ensure isSaving is set to false to stop the loading spinner.
      setIsSaving(false);
    }, 800);
  };

  return (
    <div>
      <Toaster />
      {/* Main container – responsive width */}
      <div>
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start gap-6  ">
          <TitleItaic
            title="My File"
            paragraph="🥇 A verified profile on My Appart gives you priority in applications and increases your chances of being selected."
          />
        </header>

        {/* Profile Photo + Name */}
        <div className="flex flex-col sm:flex-row items-center gap-6 py-8">
          <div className="relative">
            <img
              src={userProfile}
              alt="Profile"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover"
            />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#061251]">
              Keren Nix
            </h2>
            <p className="text-gray-500 mt-1">Anaesthesia</p>
          </div>
        </div>

        {/* Form – responsive grid */}
        <form
          onSubmit={handleSaveAndContinue}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7"
        >
          <FormInput
            label="First name"
            placeholder="Enter your first name"
            name="firstName"
          />
          <FormInput
            label="Last name"
            placeholder="Enter your last name"
            name="lastName"
          />
          <FormInput
            label="E-mail"
            placeholder="Enter your email"
            name="email"
            type="email"
          />

          {/* Phone with Country Selector */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-800">Phone</label>
            <div className="relative">
              <div
                onClick={() => setIsCountryOpen(!isCountryOpen)}
                className="flex items-center h-12 rounded-xl border border-gray-300 cursor-pointer hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all overflow-hidden"
              >
                <div className="flex items-center gap-2.5 px-4 bg-gray-50 h-full">
                  <img
                    src={`https://flagcdn.com/48x36/${selectedCountry.flag}.png`}
                    alt=""
                    className="w-7 h-5 rounded shadow-sm"
                  />
                  <span className="hidden sm:inline text-sm font-medium text-gray-800">
                    {selectedCountry.name}
                  </span>
                  <span className="sm:hidden text-sm font-medium text-gray-800">
                    {selectedCountry.code}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 ml-2 text-gray-600 transition-transform ${isCountryOpen ? "rotate-180" : ""
                      }`}
                  />
                </div>
                <div className="w-px bg-gray-300 h-8 mx-1" />
                <input
                  type="tel"
                  placeholder="123 456 7890"
                  className="flex-1 px-4 text-sm focus:outline-none"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Country dropdown – full width on mobile */}
              {isCountryOpen && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
                  {countries.map((c) => (
                    <div
                      key={c.code}
                      onClick={() => {
                        setSelectedCountry(c);
                        setIsCountryOpen(false);
                      }}
                      className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer transition"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://flagcdn.com/40x30/${c.flag}.png`}
                          alt=""
                          className="w-7 h-5 rounded shadow-sm"
                        />
                        <span className="text-sm text-gray-800">{c.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{c.code}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Professional Situation */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-800">
              Professional situation
            </label>
            <div className="relative">
              <div
                onClick={() => setIsProfessionOpen(!isProfessionOpen)}
                className="flex items-center justify-between h-12 px-4 rounded-xl border border-gray-300 cursor-pointer hover:border-gray-400 transition-all"
              >
                <span
                  className={`text-sm ${selectedProfession ? "text-gray-800" : "text-gray-400"
                    }`}
                >
                  {selectedProfession || "Select your situation"}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-600 transition-transform ${isProfessionOpen ? "rotate-180" : ""
                    }`}
                />
              </div>

              {isProfessionOpen && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
                  {professions.map((prof) => (
                    <div
                      key={prof}
                      onClick={() => {
                        setSelectedProfession(prof);
                        setIsProfessionOpen(false);
                      }}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm text-gray-800 transition"
                    >
                      {prof}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <FormInput
            label="Net monthly income"
            placeholder="Enter your net monthly income"
            name="netIncome"
          />
          <FormTextarea
            label="About you"
            placeholder="Tell us something about yourself"
          />

          {/* Save Button – full width on mobile */}
          <div className="col-span-1 md:col-span-2 flex justify-center md:justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className={`w-full  cursor-pointer md:w-auto px-12 py-4 font-semibold rounded-xl text-white text-sm tracking-wide flex items-center justify-center gap-3 transition-all ${isSaving
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-[#256AF4] hover:bg-blue-700 hover:shadow-xl"
                }`}
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Saving...
                </>
              ) : (
                "SAVE AND CONTINUE"
              )}
            </button>
          </div>
        </form>
      </div>
      <DossierFacilePage />
      <GuaranteeForm />
    </div>
  );
};

export default ProfileForm;
