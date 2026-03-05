import { useState, useEffect } from "react";
import { MoreVertical, Loader2 } from "lucide-react";
import { useDeleteOwnerAdMutation, useGetOwnerAdsQuery } from "../../../../redux/featuresAPI/owner/owner.api";
import EditAdOffcanvas from "./EditAdOffcanvas";

// Images (Fallback)
import featured4 from "../../../../assets/featured4.png";

interface Apartment {
    status: string;
    id: number;
    image: string | string[];
    price: number;
    title: string;
    location: string;
    furniture: string;
    rooms: string;
    area: string;
    isFavorite: boolean;
}

interface PropertyListProps {
    onNewAnnouncement: () => void;
}

export default function PropertyList({ onNewAnnouncement }: PropertyListProps) {
    const { data: propertiesList, isLoading: isListLoading } = useGetOwnerAdsQuery({});
    const [deleteOwnerAd] = useDeleteOwnerAdMutation();
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [toastMessage, setToastMessage] = useState("");
    const [editingAd, setEditingAd] = useState<Apartment | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);

    // Helper to construct full image URL
    const getImageUrl = (path: string) => {
        if (!path) return featured4;
        if (path.startsWith("http") || path.startsWith("https")) return path;
        const baseUrl = import.meta.env.VITE_API_URL || "";
        const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
        const cleanPath = path.startsWith("/") ? path : `/${path}`;
        return `${cleanBase}${cleanPath}`;
    };

    const displayedApartments: Apartment[] = (propertiesList?.results || propertiesList || []).map((apt: Record<string, any>) => {
        const rawImages = apt.images || apt.photos || [];
        let processedImages: string[] = [];

        if (Array.isArray(rawImages) && rawImages.length > 0) {
            processedImages = rawImages.map((img: Record<string, any> | string) => {
                if (img && typeof img === 'object' && img.image) return getImageUrl(img.image);
                if (img && typeof img === 'object' && img.file) return getImageUrl(img.file);
                if (typeof img === 'string') return getImageUrl(img);
                return featured4;
            });
        }

        return {
            id: apt.id,
            image: processedImages.length > 0 ? processedImages : featured4,
            price: Number(apt.rent || apt.total_rent || apt.rent_excluding_charges || 0),
            title: apt.title,
            location: apt.address || apt.display_address,
            furniture: apt.rental_type,
            rooms: `${apt.rooms || apt.number_of_rooms || 0} Rooms`,
            area: `${apt.surface_sqm || apt.surface_area || 0} m²`,
            isFavorite: apt.is_favorited || false,
            status: apt.status || "Online",
        };
    });

    useEffect(() => {
        const closeMenu = () => setOpenMenuId(null);
        document.addEventListener("click", closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this property?")) return;
        try {
            await deleteOwnerAd(id).unwrap();
            setOpenMenuId(null);
            setToastMessage("Property deleted successfully");
            setTimeout(() => setToastMessage(""), 3000);
        } catch (err: any) {
            const errorMessage = err?.data?.detail || err?.data?.message || "Failed to delete property";
            setToastMessage(errorMessage);
            setTimeout(() => setToastMessage(""), 3000);
        }
    };


    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case "online":
                return "border-[#96E6A1] text-[#28C76F] bg-[#F0FFF4]";
            case "pending validation":
                return "border-[#FF9F9F] text-[#FF4D4D] bg-[#FFF5F5]";
            case "rented":
                return "border-[#96C0FF] text-[#006CFF] bg-[#F0F7FF]";
            default:
                return "border-gray-200 text-gray-600 bg-gray-50";
        }
    };

    const menuItems = (apt: Apartment) => {
        const items: { label: string; action: () => void; danger?: boolean; primary?: boolean }[] = [
            {
                label: 'Edit',
                action: () => {
                    setEditingAd(apt);
                    setIsEditOpen(true);
                }
            },
            {
                label: 'Delete',
                danger: true,
                action: () => handleDelete(apt.id)
            }
        ];
        return items;
    };

    return (
        <div className="bg-white rounded-2xl border border-[#E5ECF6] p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h2 className="text-xl font-semibold text-[#061251]">My Properties</h2>
                <button
                    onClick={onNewAnnouncement}
                    className="h-11 px-5 rounded-lg border border-[#E5ECF6] bg-white text-[#061251] font-medium transition flex items-center gap-2 hover:bg-gray-100 shadow-sm whitespace-nowrap"
                >
                    <span className="text-xl leading-none text-[#256AF4]">+</span>
                    New announcement
                </button>
            </div>

            {toastMessage && (
                <div className="fixed top-20 right-6 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
                    {toastMessage}
                </div>
            )}

            {isListLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#E5ECF6]">
                                <th className="pb-4 text-left text-xs font-medium text-[#646492] uppercase tracking-wider">Property Name</th>
                                <th className="pb-4 text-left text-xs font-medium text-[#646492] uppercase tracking-wider">Date</th>
                                <th className="pb-4 text-left text-xs font-medium text-[#646492] uppercase tracking-wider">Status</th>
                                <th className="pb-4 text-right text-xs font-medium text-[#646492] uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5ECF6]">
                            {displayedApartments.map((apt) => {
                                const isOpen = openMenuId === apt.id;
                                return (
                                    <tr key={apt.id}>
                                        <td className="py-6 pr-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={Array.isArray(apt.image) ? apt.image[0] : apt.image}
                                                    alt={apt.title}
                                                    className="w-20 h-20 rounded-2xl object-cover"
                                                />
                                                <div className="min-w-0">
                                                    <div className="font-semibold text-[#061251] text-lg mb-0.5">{apt.title}</div>
                                                    <div className="text-sm text-[#646492] mb-1.5 line-clamp-1">{apt.location}</div>
                                                    <div className="text-lg font-bold text-[#061251]">
                                                        {apt.price.toLocaleString()} <span className="font-semibold uppercase text-sm">USD</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 text-sm text-[#646492] whitespace-nowrap">13 Jan, 2023</td>
                                        <td className="py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[13px] font-medium border ${getStatusStyle(apt.status)} whitespace-nowrap`}>
                                                {apt.status}
                                            </span>
                                        </td>
                                        <td className="py-6 text-right relative">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const rect = e.currentTarget.getBoundingClientRect();
                                                    setMenuPosition({
                                                        top: rect.bottom + window.scrollY,
                                                        left: rect.right - 180, // 180 is min-width
                                                    });
                                                    setOpenMenuId(isOpen ? null : apt.id);
                                                }}
                                                className="text-[#646492] hover:text-[#061251] transition p-2 rounded-lg hover:bg-gray-100"
                                            >
                                                <MoreVertical className="w-5 h-5" />
                                            </button>

                                            {isOpen && menuPosition && (
                                                <>
                                                    <div className="fixed inset-0 z-[60]" onClick={() => setOpenMenuId(null)} />
                                                    <div
                                                        style={{
                                                            top: menuPosition.top - window.scrollY + 8,
                                                            left: menuPosition.left,
                                                        }}
                                                        className="fixed z-[70] bg-white border border-[#E5ECF6] rounded-xl shadow-xl min-w-[180px] py-1.5 overflow-hidden text-left animate-in fade-in zoom-in-95 duration-100"
                                                    >
                                                        {menuItems(apt).map((item) => (
                                                            <button
                                                                key={item.label}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    if (item.action) {
                                                                        item.action();
                                                                    }
                                                                    setOpenMenuId(null);
                                                                }}
                                                                className={`w-full px-4 py-2.5 text-[13px] font-medium transition flex items-center gap-2 ${item.primary
                                                                    ? 'bg-[#256AF4] text-white hover:bg-blue-700'
                                                                    : item.danger
                                                                        ? 'text-[#FF4D4D] hover:bg-red-50'
                                                                        : 'text-[#061251] hover:bg-gray-50'
                                                                    }`}
                                                            >
                                                                {item.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            <EditAdOffcanvas
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                ad={editingAd}
            />
        </div>
    );
}
