'use client';

import { useState, useEffect } from 'react';
import { MoreVertical, Filter, X, Trash2, CheckCircle, Loader2 } from 'lucide-react';
import { useGetPropertiesQuery, useDeletePropertyMutation, useUpdatePropertyMutation } from '../../../../redux/featuresAPI/properties/property.api';

import img1 from '../../../../assets/dashboard/property1.jpg';



interface Property {
    id: number;
    name: string;
    address: string;
    price: string;
    date: string;
    views: number;
    status: 'Active' | 'Pending' | 'Processing';
    image: string;
}

// --- Toast Interface ---
interface Toast {
    message: string;
    type: 'success' | 'error';
    id: number;
}

export default function MyProperties() {
    const { data: propertiesList, isLoading } = useGetPropertiesQuery({});
    const [properties, setProperties] = useState<Property[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
    const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Pending' | 'Processing'>('All');

    // 💡 New Toast State
    const [toasts, setToasts] = useState<Toast[]>([]);

    // Edit Modal State (unchanged)
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState<Property | null>(null);
    const [editForm, setEditForm] = useState({ name: '', price: '', status: 'Active' as Property['status'] });

    // Helper to construct full image URL
    const getImageUrl = (path: string) => {
        if (!path) return img1;
        if (path.startsWith("http") || path.startsWith("https")) return path;
        const baseUrl = import.meta.env.VITE_API_URL || "";
        const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
        const cleanPath = path.startsWith("/") ? path : `/${path}`;
        return `${cleanBase}${cleanPath}`;
    };

    // Update properties when API data is available
    useEffect(() => {
        if (propertiesList) {
            const rawData = propertiesList.results || propertiesList;
            if (Array.isArray(rawData)) {
                const mappedProperties: Property[] = rawData.map((apt: any) => {
                    const rawImages = apt.images || apt.photos || [];
                    let displayImage = img1;

                    if (Array.isArray(rawImages) && rawImages.length > 0) {
                        const firstImg = rawImages[0];
                        if (firstImg) {
                            if (firstImg.image) displayImage = getImageUrl(firstImg.image);
                            else if (firstImg.file) displayImage = getImageUrl(firstImg.file);
                            else if (typeof firstImg === 'string') displayImage = getImageUrl(firstImg);
                        }
                    }

                    return {
                        id: apt.id,
                        name: apt.title,
                        address: apt.address || "No address",
                        price: `${Number(apt.total_rent || apt.rent_excluding_charges || 0).toLocaleString()} Euro`,
                        date: apt.created_at ? new Date(apt.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A',
                        views: Math.floor(Math.random() * 2000) + 100, // Mock views as it's not in API
                        status: (apt.status === 'rented' ? 'Processing' : apt.status === 'unpublished' ? 'Pending' : 'Active'),
                        image: displayImage,
                    };
                });
                setProperties(mappedProperties);
            }
        }
    }, [propertiesList]);


    // 💡 Function to show toast
    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        const id = Date.now();
        const newToast: Toast = { message, type, id };

        // Add toast
        setToasts((prev) => [...prev, newToast]);

        // Remove toast after 3 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter(t => t.id !== id));
        }, 3000);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'Pending':
                return 'bg-red-100 text-red-700 border-red-200';
            case 'Processing':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const [deleteProperty] = useDeletePropertyMutation();
    const [updateProperty] = useUpdatePropertyMutation();

    // 🗑️ Delete Property (Modified to show toast)
    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            try {
                await deleteProperty(id).unwrap();
                showToast(`Property deleted successfully!`, 'success');
       
            } catch (error) {
                 showToast("Failed to delete property", "error");
            }
        }
        setSelectedProperty(null);
    };

    // Open Edit Modal (unchanged)
    const handleEdit = (property: Property) => {
        setEditingProperty(property);
        setEditForm({
            name: property.name,
            price: property.price,
            status: property.status,
        });
        setEditModalOpen(true);
        setSelectedProperty(null);
    };

    // Save Edited Property (unchanged)
    const saveEdit = async () => {
        if (!editingProperty) return;

        try {
            await updateProperty({
                id: editingProperty.id,
                data: {
                    title: editForm.name,
                    // price is tricky if backend expects numbers but we have potentially "32,000 Euro" strings 
                    // from our local interface. It's better to verify what editForm has.
                    // editForm initialized from property.price which is a string "X Euro".
                    // The backend likely wants numbers. 
                    // Let's standardise: assume user edits the string. We need to parse it? 
                    // Or if we bound it to inputs, we should probably strip " Euro" and "," before sending.
                    // For now, I'll send strict fields.
                    rent_excluding_charges: typeof editForm.price === 'string' ? parseFloat(editForm.price.replace(/[^0-9.]/g, '')) : editForm.price,
                    status: editForm.status === 'Processing' ? 'rented' : editForm.status === 'Pending' ? 'unpublished' : 'Online', // Mapping back to backend values
                    // "Active" -> "Online" (based on generalinfo logic)
                    // "Pending" -> "unpublished"
                    // "Processing" -> "rented"
                    // This mapping is inverted from what we read.
                }
            }).unwrap();
            
            showToast(`Property "${editForm.name}" updated successfully!`, 'success');
            setEditModalOpen(false);
        } catch (error) {
            console.error("Failed to update property", error);
            showToast("Failed to update property", "error");
        }
    };

    // Filtered Properties (unchanged)
    const filteredProperties = filterStatus === 'All'
        ? properties
        : properties.filter(p => p.status === filterStatus);

    // Helper to check if the current property is the last one
    const isLastProperty = (index: number) => index === filteredProperties.length - 1;

    return (
        <>
            <div className="mt-4">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    {/* Header - p-4 on small screen, p-6 on larger */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-0">
                            My Properties ({filteredProperties.length})
                        </h1>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition w-full justify-center sm:w-auto"
                            >
                                <Filter className="w-4 h-4" />
                                <span className="text-sm font-medium">Filters</span>
                            </button>
                        </div>
                    </div>

                    {/* Filter Panel (unchanged except for padding) */}
                    {showFilters && (
                        <div className="p-4 bg-gray-50 border-b border-gray-200">
                            <div className="flex items-center gap-4 flex-wrap">
                                <span className="text-sm font-medium text-gray-700">Status:</span>
                                {(['All', 'Active', 'Pending', 'Processing'] as const).map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition ${filterStatus === status
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        {status === 'All' ? 'All Properties' : status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Table Header - Hidden on small screen, shown on large screens */}
                    <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 text-sm font-medium text-gray-500 bg-gray-50">
                        <div className="col-span-5">Property Name</div>
                        <div className="col-span-2 text-center">Date</div>
                        <div className="col-span-2 text-center">Views</div>
                        <div className="col-span-2 text-center">Status</div>
                        <div className="col-span-1 text-right">Action</div>
                    </div>

                    {/* Property Rows or No Items Message */}
                    {isLoading ? (
                        <div className="flex justify-center items-center p-12">
                            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                        </div>
                    ) : filteredProperties.length > 0 ? (
                        filteredProperties.map((property, index) => (
                            <div
                                key={property.id}
                                className={`
                                    grid grid-cols-1 gap-4 
                                    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 lg:gap-4 
                                    px-4 py-5 sm:px-6 
                                    items-center hover:bg-gray-50 transition-colors 
                                    ${index !== filteredProperties.length - 1 ? 'border-b border-gray-100' : ''}
                                `}
                            >
                                {/* Property Info (col-span-full on mobile, then adjusts) */}
                                <div className="col-span-full  lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                 
                                  <img src={property.image} alt={property.name} className='w-20 h-20 rounded-lg object-fill' />
                                    <div className='flex-grow'>
                                        <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
                                        <p className="text-sm text-gray-500">{property.address}</p>
                                        <p className="text-xl font-bold text-gray-900 mt-1">{property.price}</p>
                                    </div>
                                </div>

                                {/* Date, Views, Status - Flex layout on small screen, grid on large */}
                                <div className="flex flex-col gap-2 col-span-full lg:col-span-7 lg:grid lg:grid-cols-7 lg:gap-4">
                                    
                                    {/* Date */}
                                    <div className="flex justify-between items-center lg:col-span-2 lg:text-center text-sm text-gray-900 lg:block">
                                        <span className='font-medium text-gray-500 lg:hidden'>Date:</span>
                                        <span>{property.date}</span>
                                    </div>

                                    {/* Views */}
                                    <div className="flex justify-between items-center lg:col-span-2 lg:text-center text-sm text-gray-900 lg:block">
                                        <span className='font-medium text-gray-500 lg:hidden'>Views:</span>
                                        <span>{property.views.toLocaleString()}</span>
                                    </div>

                                    {/* Status */}
                                    <div className="flex justify-between items-center lg:col-span-2 lg:justify-center lg:block">
                                        <span className='font-medium text-gray-500 lg:hidden'>Status:</span>
                                        <span
                                            className={`px-4 py-1.5 rounded-full text-center text-xs font-semibold border ${getStatusColor(
                                                property.status
                                            )}`}
                                        >
                                            {property.status}
                                        </span>
                                    </div>

                                    {/* 🎯 Action Menu */}
                                    <div className="flex justify-start lg:col-span-1 lg:justify-end relative mt-2 lg:mt-0">
                                        <button
                                            onClick={() =>
                                                setSelectedProperty(selectedProperty === property.id ? null : property.id)
                                            }
                                            className="p-2 hover:bg-gray-200 rounded-lg"
                                        >
                                            <MoreVertical className="w-5 h-5 text-gray-600" />
                                        </button>

                                        {/* Dropdown with conditional positioning */}
                                        {selectedProperty === property.id && (
                                            <div className={`absolute right-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20 ${
                                                // Check if it's the last property overall (not just in the filter)
                                                isLastProperty(index) ? 'bottom-full mb-2' : 'top-full mt-2'
                                                }`}>
                                                <button
                                                    onClick={() => handleEdit(property)}
                                                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                                                >
                                                    Edit Property
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(property.id)}
                                                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                                                >
                                                    Delete Property
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        // 💡 No Items Message (unchanged)
                        <div className="p-12 text-center text-gray-500">
                            <Trash2 className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-lg font-medium">No properties found for this status.</p>
                            <p className="text-sm">Try adjusting your filters or adding a new property.</p>
                        </div>
                    )}
                </div>

                {/* Edit Modal (unchanged - Modals are typically handled by fixed positioning) */}
                {editModalOpen && editingProperty && (
                    <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setEditModalOpen(false)}>
                        <div
                            className="bg-white rounded-xl p-6 w-full max-w-sm sm:max-w-md" // Added max-width and p-4 for small screen
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold">Edit Property</h2>
                                <button onClick={() => setEditModalOpen(false)}>
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Property Name</label>
                                    <input
                                        type="text"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        className="mt-1 block w-full p-2 rounded-lg border border-gray-300 focus:outline-none "
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price</label>
                                    <input
                                        type="text"
                                        value={editForm.price}
                                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                        className="mt-1 p-2 block w-full rounded-lg border border-gray-300 focus:outline-none "
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <select
                                        value={editForm.status}
                                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value as Property['status'] })}
                                        className="mt-1  w-full mr-4 rounded-lg p-2 focus:outline-none border border-gray-300"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3 justify-end">
                                <button
                                    onClick={() => setEditModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={saveEdit}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Click outside dropdown to close (unchanged) */}
                {selectedProperty && (
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setSelectedProperty(null)}
                    />
                )}
            </div>

            {/* 💡 Toast Container (unchanged) */}
            <div className="fixed bottom-4 right-4 z-50 space-y-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`flex items-center gap-3 p-4 rounded-lg shadow-xl text-white ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                    >
                        {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
                        <span className="text-sm font-medium">{toast.message}</span>
                        <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}>
                            <X className="w-4 h-4 text-white/80 hover:text-white" />
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}