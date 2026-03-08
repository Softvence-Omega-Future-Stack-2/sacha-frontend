import React, { useState } from "react";
import { useAddTenantSpouseMutation } from "../../../../redux/featuresAPI/tenant/spouse.api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// Professional situations mapping (backend likely expects slugs or specific strings)
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

// Phone flags with dial codes
type PhoneFlag = {
  code: string;
  flagUrl: string;
  dialCode: string;
};

const phoneFlags: PhoneFlag[] = [
  { code: "US", flagUrl: "https://flagcdn.com/us.svg", dialCode: "+1" },
  { code: "IN", flagUrl: "https://flagcdn.com/in.svg", dialCode: "+91" },
  { code: "BD", flagUrl: "https://flagcdn.com/bd.svg", dialCode: "+880" },
  { code: "FR", flagUrl: "https://flagcdn.com/fr.svg", dialCode: "+33" },
];

// Flag Selector Component
const FlagSelector: React.FC<{
  selectedFlag: PhoneFlag;
  onSelect: (flag: PhoneFlag) => void;
}> = ({ selectedFlag, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-xl hover:bg-gray-100 transition"
      >
        <img src={selectedFlag.flagUrl} alt={selectedFlag.code} className="w-6 h-4 rounded-sm" />
        <span className="text-sm font-medium text-gray-700">{selectedFlag.dialCode}</span>
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
          {phoneFlags.map((flag) => (
            <button
              key={flag.code}
              type="button"
              onClick={() => {
                onSelect(flag);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition text-left"
            >
              <img src={flag.flagUrl} alt={flag.code} className="w-6 h-4 rounded-sm" />
              <span className="text-sm font-medium">{flag.dialCode} ({flag.code})</span>
              {selectedFlag.code === flag.code && (
                <svg className="w-5 h-5 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
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

// Main Form Component
const GuaranteeForm: React.FC = () => {
  const [addTenantSpouse, { isLoading }] = useAddTenantSpouseMutation();
  const [selectedFlag, setSelectedFlag] = useState(phoneFlags[0]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    professional_situation: "",
    net_income: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    } else if (!/^\d{5,15}$/.test(formData.phone_number)) {
      newErrors.phone_number = "Invalid phone number";
    }
    if (!formData.professional_situation) newErrors.professional_situation = "Please select a professional situation";
    if (!formData.net_income || Number(formData.net_income) <= 0) newErrors.net_income = "Income must be a positive number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the validation errors");
      return;
    }

    try {
      const apiData = new FormData();
      apiData.append("first_name", formData.first_name);
      apiData.append("last_name", formData.last_name);
      apiData.append("email", formData.email);
      apiData.append("phone_number", formData.phone_number);
      apiData.append("professional_situation", formData.professional_situation);
      apiData.append("net_income", formData.net_income);

      await addTenantSpouse(apiData).unwrap();
      toast.success("Spouse information added successfully!");
      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        professional_situation: "",
        net_income: "",
      });
    } catch (err: any) {
      console.error("Failed to add spouse:", err);
      const errorMessage = err?.data?.detail || err?.data?.message || "Failed to add spouse. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="mt-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-4">
        <h2 className="text-2xl font-medium text-[#061251] mb-10">Spouse</h2>

        <form onSubmit={handleSubmit}>
          {/* Form Fields - Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter first name"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.first_name ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                  }`}
              />
              {errors.first_name && <p className="mt-1 text-xs text-red-500">{errors.first_name}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter last name"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.last_name ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                  }`}
              />
              {errors.last_name && <p className="mt-1 text-xs text-red-500">{errors.last_name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.email ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                  }`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* Phone with Flag Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <div className="flex">
                <FlagSelector selectedFlag={selectedFlag} onSelect={setSelectedFlag} />
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className={`flex-1 px-4 py-2 border rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.phone_number ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                    }`}
                />
              </div>
              {errors.phone_number && <p className="mt-1 text-xs text-red-500">{errors.phone_number}</p>}
            </div>

            {/* Professional Situation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Situation</label>
              <select
                name="professional_situation"
                value={formData.professional_situation}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none transition ${errors.professional_situation ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                  }`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundPosition: "right 1rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.2em",
                }}
              >
                {professionalSituations.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.value === ""}
                    className={opt.value === "" ? "text-gray-400" : "text-gray-900"}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.professional_situation && <p className="mt-1 text-xs text-red-500">{errors.professional_situation}</p>}
              <p className="mt-2 text-xs text-gray-500">
                This status is crucial for determining guarantee eligibility.
              </p>
            </div>

            {/* Net Monthly Income */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Net Monthly Income</label>
              <div className="relative">
                <input
                  type="number"
                  name="net_income"
                  value={formData.net_income}
                  onChange={handleChange}
                  placeholder="e.g., 3000"
                  className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.net_income ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                    }`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium">€</span>
              </div>
              {errors.net_income && <p className="mt-1 text-xs text-red-500">{errors.net_income}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-10 py-4 rounded-xl font-medium uppercase text-white transition flex items-center gap-3 min-w-60 justify-center ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-[#256AF4] hover:bg-blue-700 shadow-lg hover:shadow-xl"
                }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Adding Spouse...
                </>
              ) : (
                "Add your spouse"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuaranteeForm;
