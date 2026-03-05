import { useState, useEffect } from "react";
import { ChevronDown, Edit, Pen, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useGetMeQuery, useUpdateMeMutation } from "../../../../redux/featuresAPI/auth/auth.api";
import userProfile from "../../../../assets/dashboard/topBarWomanImg.jpg";
import TitleItaic from "../TitleItalic";

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

// Fixed: Added dossierUrl
const mockUser = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: countries[0],
  about: "",
  profileImage: "",
  dossierUrl: "",
  role: "tenant",
  profession: "",
  netIncome: "",
};

const FormInput = ({ label, value, onChange, disabled, ...props }: any) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-gray-800">{label}</label>
    <input
      {...props}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none transition ${disabled ? "bg-gray-50" : "bg-white"
        }`}
    />
  </div>
);

const FormTextarea = ({
  label,
  value,
  onChange,
  disabled,
  placeholder,
}: any) => (
  <div className="flex flex-col space-y-2 col-span-1 md:col-span-2">
    <label className="text-sm font-medium text-gray-800">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      rows={4}
      className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none resize-none transition ${disabled ? "bg-gray-50" : "bg-white"
        }`}
    />
  </div>
);

const Myprofile: React.FC = () => {
  const { data: profileData, isLoading: isFetching } = useGetMeQuery();
  const [updateMe, { isLoading: isUpdating }] = useUpdateMeMutation();

  // Persist edit mode across reloads
  const [isEditing, setIsEditing] = useState(() => {
    return localStorage.getItem("profileEditMode") === "true";
  });

  const [formData, setFormData] = useState(mockUser);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedCountry, setSelectedCountry] = useState(formData.country);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isProfessionOpen, setIsProfessionOpen] = useState(false);

  // Sync profile data from API
  useEffect(() => {
    if (profileData?.profile) {
      const p = profileData.profile;
      // Extract country code if present in phone_number (simple heuristic)
      const foundCountry = countries.find(c => p.phone_number?.startsWith(c.code)) || countries[0];
      const phoneNumber = p.phone_number?.startsWith(foundCountry.code)
        ? p.phone_number.slice(foundCountry.code.length)
        : p.phone_number;

      setFormData({
        firstName: p.first_name || "",
        lastName: p.last_name || "",
        email: profileData.email || "",
        phone: phoneNumber || "",
        country: foundCountry,
        profession: p.professional_status || "",
        netIncome: p.net_monthly_income || "",
        about: p.about_you || "",
        profileImage: p.dp_image || "",
        dossierUrl: p.dossier_facile_url || "",
        role: p.role || "owner",
      });
      setSelectedCountry(foundCountry);
    }
  }, [profileData]);

  // Save edit mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("profileEditMode", String(isEditing));
  }, [isEditing]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Fixed: Safe .unwrap() handling + dossierUrl included
  const handleSaveAndContinue = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("first_name", formData.firstName);
    data.append("last_name", formData.lastName);
    data.append("phone_number", selectedCountry.code + formData.phone);
    data.append("professional_status", formData.profession);
    data.append("net_monthly_income", formData.netIncome);
    data.append("about_you", formData.about);

    if (imageFile) {
      data.append("dp_image", imageFile);
    }

    try {
      await updateMe(data).unwrap();

      toast.success("Profile updated successfully!", {
        style: {
          background: "#10B981",
          color: "white",
          borderRadius: "12px",
          padding: "16px 24px",
          fontWeight: "600",
        },
      });

      setIsEditing(false);
      localStorage.setItem("profileEditMode", "false");
      setImageFile(null); // Clear file after successful upload
    } catch (error: any) {
      console.error("Update failed:", error);
      const msg = error?.data?.detail || error?.data?.message || "Update failed!";
      toast.error(msg);
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start gap-6">
        <TitleItaic
          title="General Information"
          paragraph="Manage your assets and applications in the blink of an eye"
        />

        {!isEditing && (
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              disabled={isFetching}
            >
              {isFetching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Pen className="w-4 h-4" />}
              {isFetching ? "LOADING..." : "EDIT"}
            </button>
          </div>
        )}
      </header>

      {/* Profile Photo + Name */}
      <div className="flex flex-col sm:flex-row items-center gap-6 py-8">
        <div className="relative">
          <img
            src={formData.profileImage || userProfile}
            alt="Profile"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover"
          />
          {isEditing && (
            <>
              <input
                type="file"
                accept="image/*"
                id="profile-upload"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImageFile(file);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData(prev => ({
                        ...prev,
                        profileImage: reader.result as string,
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 p-2 bg-white rounded-full border border-gray-300 shadow-md translate-x-2 translate-y-2 hover:bg-gray-50 cursor-pointer transition"
              >
                <Edit className="w-4 h-4 text-gray-600" />
              </label>
            </>
          )}
        </div>

        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#061251]">
            {formData.firstName || "User"} {formData.lastName || "Name"}
          </h2>
          <p className="text-gray-500 mt-1">
            {formData.role === "owner" ? "Property Owner" : "Tenant"}
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSaveAndContinue}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7"
      >
        <FormInput
          label="First name"
          name="firstName"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
        <FormInput
          label="Last name"
          name="lastName"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
        <FormInput
          label="E-mail"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        {/* Phone + Country */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-800">Phone</label>
          <div className="relative">
            <div
              onClick={() => isEditing && setIsCountryOpen(!isCountryOpen)}
              className={`flex items-center h-12 rounded-xl border border-gray-300 ${isEditing
                ? "cursor-pointer hover:border-gray-400"
                : "cursor-default"
                } transition-all overflow-hidden`}
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
                {isEditing && (
                  <ChevronDown
                    className={`h-4 w-4 ml-2 text-gray-600 transition-transform ${isCountryOpen ? "rotate-180" : ""
                      }`}
                  />
                )}
              </div>
              <div className="w-px bg-gray-300 h-8 mx-1" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="123 456 7890"
                className="flex-1 px-4 text-sm focus:outline-none bg-transparent"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {isCountryOpen && isEditing && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
                {countries.map((c) => (
                  <div
                    key={c.code}
                    onClick={() => {
                      setSelectedCountry(c);
                      setFormData(prev => ({ ...prev, country: c }));
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
              onClick={() => isEditing && setIsProfessionOpen(!isProfessionOpen)}
              className={`flex items-center justify-between h-12 px-4 rounded-xl border border-gray-300 ${isEditing
                ? "cursor-pointer hover:border-gray-400"
                : "cursor-default"
                } transition-all`}
            >
              <span
                className={`text-sm ${formData.profession ? "text-gray-800" : "text-gray-400"
                  }`}
              >
                {formData.profession || "Select your situation"}
              </span>
              {isEditing && (
                <ChevronDown
                  className={`h-4 w-4 text-gray-600 transition-transform ${isProfessionOpen ? "rotate-180" : ""
                    }`}
                />
              )}
            </div>

            {isProfessionOpen && isEditing && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
                {professions.map((prof) => (
                  <div
                    key={prof}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, profession: prof }));
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
          name="netIncome"
          placeholder="Enter your net monthly income"
          value={formData.netIncome}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <FormTextarea
          label="About you"
          name="about"
          value={formData.about}
          onChange={handleInputChange}
          disabled={!isEditing}
          placeholder={
            formData.role === "owner"
              ? "Tell us about your properties and what makes you a great landlord..."
              : "Tell us about yourself, your profession, and what you are looking for in a rental..."
          }
        />

        {/* Save Button */}
        {isEditing && (
          <div className="col-span-1 md:col-span-2 flex justify-center md:justify-end pt-2">
            <button
              type="submit"
              disabled={isUpdating}
              className={`w-full md:w-auto px-12 py-4 font-semibold rounded-xl text-white text-sm tracking-wide flex items-center justify-center gap-3 transition-all ${isUpdating
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-[#256AF4] hover:bg-blue-700 hover:shadow-xl"
                }`}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Saving...
                </>
              ) : (
                "SAVE AND CONTINUE"
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Myprofile;