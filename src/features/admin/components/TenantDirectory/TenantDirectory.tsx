import { useState, useMemo, useEffect } from "react";
import { Phone, Heart, ChevronDown, Mail, Copy, X, PhoneCall, Check } from "lucide-react";
import { useGetDirectoryQuery } from "../../../../redux/featuresAPI/directory/directoryApi";

export default function TenantDirectory() {
  const { data: tenantDirectory, isLoading } = useGetDirectoryQuery({});
  console.log(tenantDirectory);
  const [selectedTenant, setSelectedTenant] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Filter States
  const [activeTab, setActiveTab] = useState<"All" | "Registered" | "Contacted">("All");

  const [filesOpen, setFilesOpen] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState("All Files");


  const filesOptions = ["All Files", "Complete Files", "Incomplete Files", "With Guarantees"];

  const tenants = useMemo(() => {
    if (!tenantDirectory || !Array.isArray(tenantDirectory)) return [];

    return tenantDirectory.map((candidate: any, index: number) => ({
      id: candidate.candidate_id,
      name: candidate.full_name || `${candidate.first_name} ${candidate.last_name}`,
      code: `C9${188 + index}`,
      contract: candidate.professional_situation || "Permanent contract",
      favorite: false,
      tab: candidate.status ? candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1) : "Registered",
      situation: candidate.professional_situation || "CDI",
      fileStatus: "Complete Files",
      phone: "+33633223580",
      email: candidate.email,
      accommodation: "Apartment",
      surface: "25 m²",
      rent: "€750",
      moveIn: "April 30, 2026",
      deposit: "€1000",
      sector: "Agde (34300)",
      dp_image: candidate.dp_image,
    }));
  }, [tenantDirectory]);

  useEffect(() => {
    if (tenants.length > 0 && !selectedTenant) {
      setSelectedTenant(tenants[0]);
    }
  }, [tenants, selectedTenant]);

  const filteredTenants = useMemo(() => {
    return tenants.filter((tenant: any) => {
      const tabMatch = activeTab === "All" || tenant.tab === activeTab;
      const fileMatch = selectedFiles === "All Files" || tenant.fileStatus === selectedFiles;
      return tabMatch && fileMatch;
    });
  }, [activeTab, selectedFiles, tenants]);

  const handleCopy = (text: string, type: "phone" | "email") => {
    navigator.clipboard.writeText(text);
    if (type === "phone") {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!selectedTenant) return null;

  return (
    <>
      <div >
        <div >

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 className="text-2xl font-semibold text-gray-900">Tenant Directory</h1>
            <div className="flex flex-wrap gap-3">


              {/* Files Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setFilesOpen(!filesOpen)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
                >
                  {selectedFiles}
                  <ChevronDown className={`w-4 h-4 transition ${filesOpen ? "rotate-180" : ""}`} />
                </button>
                {filesOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {filesOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setSelectedFiles(opt); setFilesOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between"
                      >
                        {opt}
                        {selectedFiles === opt && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Layout – Mobile , Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

            {/* Tenant List – Mobile , Desktop */}
            <div className="order-1 lg:order-1 lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-4">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex gap-2 flex-wrap">
                    {["All", "Registered", "Contacted"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-4 py-2 text-sm font-medium rounded-full transition ${activeTab === tab
                          ? "text-white bg-blue-600 hover:bg-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                  {filteredTenants.map((tenant) => (
                    <div
                      key={tenant.id}
                      onClick={() => setSelectedTenant(tenant)}
                      className={`flex items-center gap-3 p-4 hover:bg-gray-50 transition cursor-pointer ${selectedTenant?.id === tenant.id ? "bg-blue-50 border-l-4 border-blue-600" : ""
                        }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold shadow-md">
                        {tenant.name.split(" ").map((n: string) => n[0]).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="text-sm font-medium text-gray-900 truncate">{tenant.name}</p>
                          {tenant.favorite && <Heart className="w-4 h-4 text-red-500 fill-red-500" />}
                        </div>
                        <p className="text-xs text-gray-500">{tenant.code} • {tenant.contract}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tenant Details – Mobile, Desktop  */}
            <div className="order-2 lg:order-2 lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {selectedTenant.name.split(" ").map((n: string) => n[0]).join("")}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                          {selectedTenant.name}
                          {selectedTenant.favorite && <Heart className="w-5 h-5 text-red-500 fill-red-500" />}
                        </h2>
                        <p className="text-sm text-gray-500">{selectedTenant.code} • {selectedTenant.contract}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium w-full sm:w-auto justify-center"
                    >
                      <Phone className="w-4 h-4" />
                      Contact
                    </button>
                  </div>

                  <hr className="border-gray-200 mb-6" />

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Search criteria</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                        <div><p className="text-gray-500">Type of accommodation</p><p className="font-medium text-gray-900">{selectedTenant.accommodation}</p></div>
                        <div><p className="text-gray-500">Rental type</p><p className="font-medium text-gray-900">-</p></div>
                        <div><p className="text-gray-500">Minimum surface area</p><p className="font-medium text-gray-900">{selectedTenant.surface}</p></div>
                        <div><p className="text-gray-500">Maximum rent</p><p className="font-medium text-gray-900">{selectedTenant.rent}</p></div>
                        <div><p className="text-gray-500">Number of rooms</p><p className="font-medium text-gray-900">-</p></div>
                        <div><p className="text-gray-500">Number of pieces</p><p className="font-medium text-gray-900">-</p></div>
                        <div><p className="text-gray-500">Move-in date</p><p className="font-medium text-gray-900">{selectedTenant.moveIn}</p></div>
                        <div><p className="text-gray-500">Maximum security deposit</p><p className="font-medium text-gray-900">{selectedTenant.deposit}</p></div>
                      </div>
                    </div>

                    <hr className="border-gray-200" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Research sectors</h3>
                      <p className="text-sm text-gray-600">{selectedTenant.sector}</p>
                    </div>

                    <hr className="border-gray-200" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Tenant file</h3>
                      <div className="space-y-3">
                        {["Identity document", "Proof of address", "Proof of income", "Payslip", "Proof of professional status", "Tax notice", "Additional documents"].map((doc) => (
                          <div key={doc} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-700">{doc}</span>
                            <span className="px-3 py-1 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-full">
                              {selectedTenant.fileStatus.includes("Complete") ? "Uploaded" : "No file"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <hr className="border-gray-200" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Guarantees</h3>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Guarantee 1 - Body</p>
                      </div>
                    </div>

                    <hr className="border-gray-200" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Spouse</h3>
                      <div className="p-8 bg-gray-50 rounded-lg text-center">
                        <p className="text-sm text-gray-600">This tenant did not provide information about a spouse.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Modal */}
        {isModalOpen && (
          <div className="fixed lg:px-0 px-4 inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4 text-sm text-gray-600">
                <p>You can contact this tenant by phone whenever you wish.</p>
                <p className="font-medium text-gray-900">
                  Consider offering them your accommodation as well. This way they will receive a description of the accommodation by email.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <PhoneCall className="w-5 h-5 text-gray-700" />
                      <a href={`tel:${selectedTenant.phone}`} className="font-medium text-gray-900 hover:underline">
                        {selectedTenant.phone}
                      </a>
                    </div>
                    <button onClick={() => handleCopy(selectedTenant.phone, "phone")} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition">
                      {copiedPhone ? (
                        <>
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-xs font-medium text-green-600">Copied!</span>
                        </>
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-700" />
                      <a href={`mailto:${selectedTenant.email}`} className="font-medium text-gray-900 hover:underline">
                        {selectedTenant.email}
                      </a>
                    </div>
                    <button onClick={() => handleCopy(selectedTenant.email, "email")} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition">
                      {copiedEmail ? (
                        <>
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-xs font-medium text-green-600">Copied!</span>
                        </>
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}