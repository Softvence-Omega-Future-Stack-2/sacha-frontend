// src/components/ProfileForm.tsx
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import userProfileImg from "../../../assets/dashboard/topBarWomanImg.jpg";
import TitleItaic from "./TitleItalic";
import DossierFacilePage from "./MyFilesPage/DossierFacile";
import GuaranteeForm from "./MyFilesPage/Guarantees";
import { useGetMeQuery, useUpdateMeMutation } from "../../../redux/featuresAPI/auth/auth.api";
import { useGetTenantFileQuery, useCreateTenantFileMutation } from "../../../redux/featuresAPI/tenantProfileApi/tenantProfileApi";
import { useRef } from "react";

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

const professionalSituations = [
  { label: "Select professional situation", value: "" },
  { label: "Software Engineer", value: "software_engineer" },
  { label: "Full Stack Developer", value: "full_stack_developer" },
  { label: "Data Scientist", value: "data_scientist" },
  { label: "DevOps Engineer", value: "devops_engineer" },
  { label: "Doctor", value: "doctor" },
  { label: "Nurse", value: "nurse" },
  { label: "Pharmacist", value: "pharmacist" },
  { label: "Surgeon", value: "surgeon" },
  { label: "Teacher", value: "teacher" },
  { label: "Professor", value: "professor" },
  { label: "Lecturer", value: "lecturer" },
  { label: "Researcher", value: "researcher" },
  { label: "Entrepreneur", value: "entrepreneur" },
  { label: "Accountant", value: "accountant" },
  { label: "Marketing Manager", value: "marketing_manager" },
  { label: "Sales Executive", value: "sales_executive" },
  { label: "Civil Engineer", value: "civil_engineer" },
  { label: "Mechanical Engineer", value: "mechanical_engineer" },
  { label: "Electrical Engineer", value: "electrical_engineer" },
  { label: "Government Officer", value: "government_officer" },
  { label: "Police", value: "police" },
  { label: "Military", value: "military" },
  { label: "Designer", value: "designer" },
  { label: "Writer", value: "writer" },
  { label: "Content Creator", value: "content_creator" },
  { label: "Photographer", value: "photographer" },
  { label: "Student", value: "student" },
  { label: "Freelancer", value: "freelancer" },
  { label: "Unemployed", value: "unemployed" },
] as const;

const FormInput = ({ label, placeholder, name, type = "text", value, onChange, disabled }: any) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-gray-800">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none transition disabled:bg-gray-100 disabled:text-gray-500"
    />
  </div>
);

const FormTextarea = ({ label, placeholder, value, onChange, disabled }: any) => (
  <div className="flex flex-col space-y-2 col-span-1 md:col-span-2">
    <label className="text-sm font-medium text-gray-800">{label}</label>
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      rows={4}
      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none resize-none transition disabled:bg-gray-100 disabled:text-gray-500"
    />
  </div>
);

const ProfileForm: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectedProfession, setSelectedProfession] = useState("");
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isProfessionOpen, setIsProfessionOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [netIncome, setNetIncome] = useState("");
  const [about, setAbout] = useState("");
  const [dpImage, setDpImage] = useState(userProfileImg);
  const [dpFile, setDpFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: meData, isLoading: meLoading, isError: meError } = useGetMeQuery();
  const { data: fileData, isLoading: fileLoading, isError: fileError } = useGetTenantFileQuery();
  const [updateMe] = useUpdateMeMutation();
  const [createTenantFile] = useCreateTenantFileMutation();

  useEffect(() => {
    if (meData?.success && meData?.profile) {
      setFirstName(meData.profile.first_name || "");
      setLastName(meData.profile.last_name || "");
      // Assuming email might come from profile, auth endpoints usually don't have it in /me if it's not listed, so falling back.
      if (meData.profile.email) setEmail(meData.profile.email);
      if (meData.profile.dp_image) setDpImage(meData.profile.dp_image);

      if (meData.profile.phone_number) {
        const fullPhone = meData.profile.phone_number;
        const matchedCountry = countries.find(c => fullPhone.startsWith(c.code));
        if (matchedCountry) {
          setSelectedCountry(matchedCountry);
          setPhone(fullPhone.slice(matchedCountry.code.length));
        } else {
          setPhone(fullPhone);
        }
      }
    }
  }, [meData]);

  useEffect(() => {
    if (fileData?.success && fileData?.tenant_file?.length > 0) {
      const file = fileData.tenant_file[0];
      setNetIncome(file.net_monthly_income?.toString() || "");
      setAbout(file.about || "");

      const matchedProfession = professionalSituations.find(
        p => p.value === file.profession || p.label.toLowerCase() === file.profession?.toLowerCase()
      );
      if (matchedProfession) {
        setSelectedProfession(matchedProfession.value);
      } else if (file.profession) {
        setSelectedProfession(file.profession);
      }
    }
  }, [fileData]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDpFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setDpImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAndContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // 1. Update Profile (Auth)
      const profileFormData = new FormData();
      profileFormData.append("first_name", firstName);
      profileFormData.append("last_name", lastName);
      profileFormData.append("phone_number", selectedCountry.code + phone);
      if (dpFile) {
        profileFormData.append("dp_image", dpFile);
      }

      await updateMe(profileFormData).unwrap();

      // 2. Create/Update Tenant File
      const tenantFileFormData = new FormData();
      tenantFileFormData.append("profession", selectedProfession);
      tenantFileFormData.append("net_monthly_income", netIncome);
      tenantFileFormData.append("about", about);

      await createTenantFile(tenantFileFormData).unwrap();

      toast.success("Profile updated successfully!", {
        style: {
          background: "#10B981",
          color: "white",
          fontWeight: "600",
          borderRadius: "12px",
          padding: "16px 24px",
        },
      });
    } catch (err: any) {
      console.error("Save failed:", err);
      toast.error(err?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
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
        {(meLoading || fileLoading) ? (
          <div className="flex flex-col sm:flex-row items-center gap-6 py-8 animate-pulse">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-200" />
            <div className="text-center sm:text-left space-y-3">
              <div className="h-8 bg-gray-200 rounded w-48"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        ) : (meError || fileError) ? (
          <div className="py-8 text-red-500 font-medium">
            Failed to load profile data. Please try again.
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-6 py-8">
            <div className="relative group cursor-pointer" onClick={handleImageClick}>
              <img
                src={dpImage}
                alt="Profile"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-gray-100 shadow-sm transition-opacity group-hover:opacity-75"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">Change</span>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#061251] capitalize">
                {firstName || lastName ? `${firstName} ${lastName}` : "My Profile"}
              </h2>
              <p className="text-gray-500 mt-1 capitalize">
                {selectedProfession || "Tenant"}
              </p>
            </div>
          </div>
        )}

        {/* Form – responsive grid */}
        <form
          onSubmit={handleSaveAndContinue}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7"
        >
          <FormInput
            label="First name"
            placeholder="Enter your first name"
            name="firstName"
            value={firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
          />
          <FormInput
            label="Last name"
            placeholder="Enter your last name"
            name="lastName"
            value={lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
          />
          <FormInput
            label="E-mail"
            placeholder="Enter your email"
            name="email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 px-4 text-sm focus:outline-none bg-transparent"
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
                  {professionalSituations.find(p => p.value === selectedProfession)?.label || "Select your situation"}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-600 transition-transform ${isProfessionOpen ? "rotate-180" : ""
                    }`}
                />
              </div>

              {isProfessionOpen && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
                  {professionalSituations.map((prof) => (
                    <div
                      key={prof.value}
                      onClick={() => {
                        setSelectedProfession(prof.value);
                        setIsProfessionOpen(false);
                      }}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm transition ${prof.value === "" ? "text-gray-400" : "text-gray-800"}`}
                    >
                      {prof.label}
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
            value={netIncome}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNetIncome(e.target.value)}
          />
          <FormTextarea
            label="About you"
            placeholder="Tell us something about yourself"
            value={about}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAbout(e.target.value)}
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
