import { baseAPI } from "../../baseAPI/baseApi";

export interface OwnerAdRequest {
    title: string;
    description: string;
    address: string;
    display_address: string;
    show_exact_address: boolean;
    city: string;
    postal_code: string;
    property_type: string;
    rental_type: string;
    available_from: string;
    rent: string;
    monthly_charges: string;
    deposit: string;
    surface_sqm: number;
    rooms: number;
    pieces: number;
    floor: number;
    built_year: number;
    dpe: string;
    ghg: string;
    furnished: boolean;
    bedrooms: number;
    bathrooms: number;
    orientation: string;
    latitude?: string;
    longitude?: string;
    rent_guarantee_insurance: boolean;
    service_tag_ids: number[];
    status?: string | "Online" | "Pending Validation" | "Rented" | "Unpublished";
    // For uploads
    uploaded_images?: File[];
    image_alt_texts?: string;
    image_captions?: string;
    image_is_primary?: string;
    image_sort_orders?: string;
}

export const ownerAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getOwnerAds: build.query({
            query: () => ({
                url: "/owner/owner/ads/",
                method: "GET",
            }),
            providesTags: ["Properties"],
        }),
        getOwnerAdById: build.query({
            query: (id: number) => ({
                url: `/owner/owner/ads/${id}/`,
                method: "GET",
            }),
            providesTags: (_result, _error, id) => [{ type: "Properties", id }],
        }),
        addOwnerAd: build.mutation({
            query: (data: FormData | OwnerAdRequest) => ({
                url: "/owner/owner/ads/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Properties"],
        }),
        updateOwnerAd: build.mutation({
            query: ({ id, data }: { id: number; data: FormData | Partial<OwnerAdRequest> }) => ({
                url: `/owner/owner/ads/${id}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Properties"],
        }),
        deleteOwnerAd: build.mutation({
            query: (id: number) => ({
                url: `/owner/owner/ads/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Properties"],
        }),
        getPublicAds: build.query({
            query: (params) => ({
                url: "/owner/public/ads/",
                method: "GET",
                params,
            }),
            providesTags: ["Properties"],
        }),
        getPublicAdById: build.query({
            query: (id: number | string) => ({
                url: `/owner/public/ads/${id}/`,
                method: "GET",
            }),
            providesTags: (_result, _error, id) => [{ type: "Properties", id }],
        }),
    }),
});

export const {
    useGetOwnerAdsQuery,
    useGetOwnerAdByIdQuery,
    useAddOwnerAdMutation,
    useUpdateOwnerAdMutation,
    useDeleteOwnerAdMutation,
    useGetPublicAdsQuery,
    useGetPublicAdByIdQuery,
} = ownerAPI;
