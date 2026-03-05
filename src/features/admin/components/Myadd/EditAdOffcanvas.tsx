import React, { useState, useEffect, useRef } from "react";
import { X, Loader2, ChevronDown, Check, Plus, Trash2 } from "lucide-react";
import { useUpdateOwnerAdMutation, useGetOwnerAdByIdQuery } from "../../../../redux/featuresAPI/owner/owner.api";
import { toast } from "sonner";

interface EditAdOffcanvasProps {
    isOpen: boolean;
    onClose: () => void;
    ad: any;
}

export default function EditAdOffcanvas({ isOpen, onClose, ad }: EditAdOffcanvasProps) {
    const { data: adDetails, isLoading: isFetching } = useGetOwnerAdByIdQuery(ad?.id, { skip: !ad?.id || !isOpen });
    const [updateOwnerAd, { isLoading: isUpdating }] = useUpdateOwnerAdMutation();
    const [formData, setFormData] = useState<any>({});
    const [uploadedFiles, setUploadedFiles] = useState<{ file: File; preview: string }[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const propertyOptions = [
        { value: "Apartment", label: "Apartment" },
        { value: "House", label: "House" },
        { value: "Studio", label: "Studio" },
        { value: "Villa", label: "Villa" },
    ];

    const rentalOptions = [
        { value: "Furnished", label: "Furnished" },
        { value: "Unfurnished", label: "Unfurnished" },
    ];

    const featuresList = ["Garden", "Pool", "Balcony", "Terrace", "Box", "Garage", "Parking", "Cellar", "Basement", "No overlooking", "Beautiful view", "South-facing"];

    useEffect(() => {
        if (adDetails) {
            // Handle service_tags which might be ["Tag1,Tag2"] or ["Tag1", "Tag2"]
            let selectedFeatures: string[] = [];
            if (Array.isArray(adDetails.service_tags)) {
                if (adDetails.service_tags.length === 1 && adDetails.service_tags[0].includes(',')) {
                    selectedFeatures = adDetails.service_tags[0].split(',').map((s: string) => s.trim());
                } else {
                    selectedFeatures = adDetails.service_tags.map((s: string) => s.trim());
                }
            }

            setFormData({
                title: adDetails.title || "",
                description: adDetails.description || "",
                address: adDetails.address || "",
                display_address: adDetails.display_address || "",
                show_exact_address: adDetails.show_exact_address ?? true,
                city: adDetails.city || "",
                postal_code: adDetails.postal_code || "",
                property_type: adDetails.property_type ? adDetails.property_type.charAt(0).toUpperCase() + adDetails.property_type.slice(1) : "Apartment",
                rental_type: adDetails.rental_type ? adDetails.rental_type.charAt(0).toUpperCase() + adDetails.rental_type.slice(1) : "Furnished",
                available_from: adDetails.available_from || "",
                rent: adDetails.rent || "",
                monthly_charges: adDetails.monthly_charges || "0",
                deposit: adDetails.deposit || "0",
                surface_sqm: adDetails.surface_sqm || 0,
                rooms: adDetails.rooms || 0,
                pieces: adDetails.pieces || 0,
                floor: adDetails.floor || 0,
                built_year: adDetails.built_year || 0,
                dpe: adDetails.dpe || "A",
                ghg: adDetails.ghg || "A",
                furnished: adDetails.furnished ?? false,
                bedrooms: adDetails.bedrooms || 0,
                bathrooms: adDetails.bathrooms || 0,
                orientation: adDetails.orientation || "north",
                latitude: adDetails.latitude || "0",
                longitude: adDetails.longitude || "0",
                rent_guarantee_insurance: adDetails.rent_guarantee_insurance ?? true,
                features: selectedFeatures,
            });
        }
    }, [adDetails]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        if (type === "checkbox") {
            setFormData((prev: any) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else {
            setFormData((prev: any) => ({ ...prev, [name]: value }));
        }
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const toggleFeature = (feature: string) => {
        setFormData((prev: any) => {
            const current = prev.features || [];
            const next = current.includes(feature)
                ? current.filter((f: string) => f !== feature)
                : [...current, feature];
            return { ...prev, features: next };
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) => ({
                file,
                preview: URL.createObjectURL(file),
            }));
            setUploadedFiles((prev) => [...prev, ...filesArray]);
        }
    };

    const removeFile = (index: number) => {
        setUploadedFiles((prev) => {
            const newFiles = [...prev];
            URL.revokeObjectURL(newFiles[index].preview);
            newFiles.splice(index, 1);
            return newFiles;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formDataObj = new FormData();

            // Append basic fields
            formDataObj.append("title", formData.title);
            formDataObj.append("description", formData.description || "");
            formDataObj.append("address", formData.address);
            formDataObj.append("display_address", formData.display_address || formData.address);
            formDataObj.append("show_exact_address", String(formData.show_exact_address));
            formDataObj.append("city", formData.city);
            formDataObj.append("postal_code", formData.postal_code);
            formDataObj.append("property_type", formData.property_type.toLowerCase());
            formDataObj.append("rental_type", formData.rental_type.toLowerCase());
            formDataObj.append("available_from", formData.available_from);
            formDataObj.append("rent", formData.rent);
            formDataObj.append("monthly_charges", formData.monthly_charges || "0");
            formDataObj.append("deposit", formData.deposit || "0");
            formDataObj.append("surface_sqm", String(formData.surface_sqm));
            formDataObj.append("rooms", String(formData.rooms));
            formDataObj.append("pieces", String(formData.pieces));
            formDataObj.append("floor", String(formData.floor));
            formDataObj.append("built_year", String(formData.built_year));
            formDataObj.append("dpe", formData.dpe);
            formDataObj.append("ghg", formData.ghg);
            formDataObj.append("furnished", String(formData.rental_type.toLowerCase() === "furnished"));
            formDataObj.append("bedrooms", String(formData.bedrooms));
            formDataObj.append("bathrooms", String(formData.bathrooms));
            formDataObj.append("orientation", formData.orientation);
            formDataObj.append("rent_guarantee_insurance", String(formData.rent_guarantee_insurance));

            // Append service tags
            if (formData.features && formData.features.length > 0) {
                formDataObj.append("service_tags", formData.features.join(","));
            }

            // Append new images
            uploadedFiles.forEach((fileObj) => {
                formDataObj.append("uploaded_images", fileObj.file);
            });

            // Metadata for NEW images
            if (uploadedFiles.length > 0) {
                const imageMetadata = uploadedFiles.map(() => "property image");
                formDataObj.append("image_alt_texts", imageMetadata.join(","));
                formDataObj.append("image_captions", imageMetadata.join(","));
                formDataObj.append("image_is_primary", uploadedFiles.map((_, i) => i === 0 && (!adDetails.images || adDetails.images.length === 0)).join(","));
                formDataObj.append("image_sort_orders", uploadedFiles.map((_, i) => i + (adDetails.images?.length || 0)).join(","));
            }

            await updateOwnerAd({ id: ad.id, data: formDataObj }).unwrap();
            toast.success("Ad updated successfully!");
            onClose();
        } catch (err: any) {
            console.error("Failed to update ad:", err);
            const errorMessage = err?.data?.detail || err?.data?.message || "Failed to update ad";
            toast.error(errorMessage);
        }
    };

    const CustomSelect = ({ label, name, value, options }: any) => {
        const [isSelectOpen, setIsSelectOpen] = useState(false);
        const ref = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                if (ref.current && !ref.current.contains(e.target as Node)) setIsSelectOpen(false);
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        return (
            <div ref={ref} className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsSelectOpen(!isSelectOpen)}
                        className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-white flex items-center justify-between text-left text-gray-900 focus:outline-none transition-all"
                    >
                        <span>{value}</span>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isSelectOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isSelectOpen && (
                        <div className="absolute z-[60] mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-xl max-h-60 overflow-y-auto">
                            {options.map((opt: any) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => {
                                        handleSelectChange(name, opt.value);
                                        setIsSelectOpen(false);
                                    }}
                                    className="w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 flex items-center justify-between text-sm"
                                >
                                    <span>{opt.label}</span>
                                    {value === opt.value && <Check className="w-4 h-4 text-blue-600" />}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 transition-opacity"
                onClick={onClose}
            />
            <div className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-[#061251]">Edit Announcement</h2>
                        <p className="text-xs text-gray-500 mt-0.5">Update all details of your property listing</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {isFetching ? (
                    <div className="flex flex-col items-center justify-center h-[calc(100%-80px)] text-gray-400 gap-3">
                        <Loader2 className="w-10 h-10 animate-spin text-[#256AF4]" />
                        <p className="text-sm font-medium">Fetching ad details...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="h-[calc(100%-80px)] flex flex-col">
                        <div className="flex-1 overflow-y-auto p-8 space-y-10">
                            {/* Section 1: General Info */}
                            <div className="space-y-6">
                                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-blue-100 pb-2">General Information</h3>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                        placeholder="Ad Title"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition resize-none"
                                        placeholder="Property description..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                        placeholder="Complete address"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                            placeholder="Enter city"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Postal Code</label>
                                        <input
                                            type="text"
                                            name="postal_code"
                                            value={formData.postal_code}
                                            onChange={handleChange}
                                            className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                            placeholder="Enter postal code"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <CustomSelect
                                        label="Property Type"
                                        name="property_type"
                                        value={formData.property_type}
                                        options={propertyOptions}
                                    />
                                    <CustomSelect
                                        label="Rental Type"
                                        name="rental_type"
                                        value={formData.rental_type}
                                        options={rentalOptions}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Available From</label>
                                        <input
                                            type="date"
                                            name="available_from"
                                            value={formData.available_from}
                                            onChange={handleChange}
                                            className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Rent</label>
                                        <input
                                            type="text"
                                            name="rent"
                                            value={formData.rent}
                                            onChange={handleChange}
                                            className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Monthly Charges</label>
                                        <input
                                            type="text"
                                            name="monthly_charges"
                                            value={formData.monthly_charges}
                                            onChange={handleChange}
                                            className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Security Deposit</label>
                                        <input
                                            type="text"
                                            name="deposit"
                                            value={formData.deposit}
                                            onChange={handleChange}
                                            className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Technical Details */}
                            <div className="space-y-6 pt-4">
                                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-blue-100 pb-2">Technical Details</h3>

                                <div className="grid grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Surface (m²)</label>
                                        <input
                                            type="number"
                                            name="surface_sqm"
                                            value={formData.surface_sqm}
                                            onChange={handleChange}
                                            className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Floor</label>
                                        <input
                                            type="number"
                                            name="floor"
                                            value={formData.floor}
                                            onChange={handleChange}
                                            className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Year Built</label>
                                        <input
                                            type="number"
                                            name="built_year"
                                            value={formData.built_year}
                                            onChange={handleChange}
                                            className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Number of rooms</label>
                                        <div className="flex flex-wrap gap-2">
                                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                                <button
                                                    key={n}
                                                    type="button"
                                                    onClick={() => handleSelectChange("rooms", String(n))}
                                                    className={`w-10 h-10 rounded-lg border font-medium transition-all text-sm ${Number(formData.rooms) === n
                                                        ? "border-blue-600 bg-blue-600 text-white"
                                                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                                                        }`}
                                                >
                                                    {n}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Number of pieces</label>
                                        <div className="flex flex-wrap gap-2">
                                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                                <button
                                                    key={n}
                                                    type="button"
                                                    onClick={() => handleSelectChange("pieces", String(n))}
                                                    className={`w-10 h-10 rounded-lg border font-medium transition-all text-sm ${Number(formData.pieces) === n
                                                        ? "border-blue-600 bg-blue-600 text-white"
                                                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                                                        }`}
                                                >
                                                    {n}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Energy Class</label>
                                        <div className="flex flex-wrap gap-2">
                                            {["A", "B", "C", "D", "E", "F", "G"].map((l) => (
                                                <button
                                                    key={l}
                                                    type="button"
                                                    onClick={() => handleSelectChange("dpe", l)}
                                                    className={`w-10 h-10 rounded-lg border font-medium transition-all text-sm ${formData.dpe === l
                                                        ? "border-blue-600 bg-blue-600 text-white"
                                                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                                                        }`}
                                                >
                                                    {l}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">GHG</label>
                                        <div className="flex flex-wrap gap-2">
                                            {["A", "B", "C", "D", "E", "F", "G"].map((l) => (
                                                <button
                                                    key={l}
                                                    type="button"
                                                    onClick={() => handleSelectChange("ghg", l)}
                                                    className={`w-10 h-10 rounded-lg border font-medium transition-all text-sm ${formData.ghg === l
                                                        ? "border-blue-600 bg-blue-600 text-white"
                                                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                                                        }`}
                                                >
                                                    {l}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Bedrooms</label>
                                        <div className="flex flex-wrap gap-2">
                                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                                <button
                                                    key={n}
                                                    type="button"
                                                    onClick={() => handleSelectChange("bedrooms", String(n))}
                                                    className={`w-10 h-10 rounded-lg border font-medium transition-all text-sm ${Number(formData.bedrooms) === n
                                                        ? "border-blue-600 bg-blue-600 text-white"
                                                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                                                        }`}
                                                >
                                                    {n}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Bathrooms</label>
                                        <div className="flex flex-wrap gap-2">
                                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                                <button
                                                    key={n}
                                                    type="button"
                                                    onClick={() => handleSelectChange("bathrooms", String(n))}
                                                    className={`w-10 h-10 rounded-lg border font-medium transition-all text-sm ${Number(formData.bathrooms) === n
                                                        ? "border-blue-600 bg-blue-600 text-white"
                                                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                                                        }`}
                                                >
                                                    {n}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-700">Orientation</label>
                                    <div className="flex flex-wrap gap-2">
                                        {["north", "south", "east", "west"].map((o) => (
                                            <button
                                                key={o}
                                                type="button"
                                                onClick={() => handleSelectChange("orientation", o)}
                                                className={`px-4 py-2 rounded-lg border font-medium capitalize transition-all text-sm ${formData.orientation === o
                                                    ? "border-blue-600 bg-blue-600 text-white"
                                                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                                                    }`}
                                            >
                                                {o}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Features & Services */}
                            <div className="space-y-6 pt-4">
                                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-blue-100 pb-2">Features & Services</h3>

                                <div className="flex flex-wrap gap-3">
                                    {featuresList.map((feature) => (
                                        <button
                                            key={feature}
                                            type="button"
                                            onClick={() => toggleFeature(feature)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${formData.features?.includes(feature)
                                                ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                                                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                                }`}
                                        >
                                            {feature}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <input
                                        type="checkbox"
                                        name="rent_guarantee_insurance"
                                        checked={formData.rent_guarantee_insurance}
                                        onChange={handleChange}
                                        id="insurance-edit"
                                        className="w-5 h-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <label htmlFor="insurance-edit" className="text-sm font-medium text-blue-900 cursor-pointer">
                                        I would like a Rent Guarantee Insurance policy.
                                    </label>
                                </div>
                            </div>

                            {/* Section 4: Property Images */}
                            <div className="space-y-6 pt-4 pb-8">
                                <div className="flex items-center justify-between border-b border-blue-100 pb-2">
                                    <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider">Property Images</h3>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center gap-1.5 text-xs font-bold text-[#256AF4] hover:text-blue-700 transition"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Images
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    {/* Existing Images */}
                                    {adDetails?.images?.map((img: any) => (
                                        <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group">
                                            <img
                                                src={img.image}
                                                alt={img.alt_text || "property"}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="text-[10px] text-white font-bold bg-blue-600/80 px-2 py-1 rounded-full">Existing</span>
                                            </div>
                                        </div>
                                    ))}

                                    {/* New Uploads */}
                                    {uploadedFiles.map((file, index) => (
                                        <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-blue-200 group animate-in zoom-in-95 duration-200">
                                            <img
                                                src={file.preview}
                                                alt="preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeFile(index)}
                                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <div className="absolute bottom-2 left-2">
                                                <span className="text-[10px] text-white font-bold bg-green-600/80 px-2 py-1 rounded-full shadow-sm">New</span>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Empty State / Add Placeholder */}
                                    {((!adDetails?.images || adDetails.images.length === 0) && uploadedFiles.length === 0) && (
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/50 transition-all group"
                                        >
                                            <div className="p-3 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors">
                                                <Plus className="w-6 h-6" />
                                            </div>
                                            <span className="text-xs font-bold">Upload Photos</span>
                                        </button>
                                    )}
                                </div>
                                <p className="text-[10px] text-gray-500 italic">* You can add multiple photos. The first photo will be used as the cover.</p>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 h-12 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isUpdating}
                                className="flex-1 h-12 rounded-xl bg-[#256AF4] text-white font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition flex items-center justify-center disabled:opacity-70"
                            >
                                {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}
