import { baseAPI } from "../../baseAPI/baseApi";

export interface PossessionAdImage {
    id: number;
    ad: number;
    image: string;
    alt_text: string;
    caption: string;
    is_primary: boolean;
    sort_order: number;
    created_at: string;
}

export interface PossessionAdDetails {
    id: number;
    owner: number;
    status: string;
    title: string;
    description: string;
    address: string;
    display_address: string;
    show_exact_address: boolean;
    city: string;
    postal_code: string;
    property_type: string;
    rental_type: string;
    available_from: string | null;
    rent: number;
    monthly_charges: number;
    deposit?: number;
    surface_sqm?: number;
    rooms?: number;
    pieces?: number;
    floor?: number;
    built_year?: number | null;
    dpe?: string;
    ghg?: string;
    furnished?: boolean;
    bedrooms?: number;
    bathrooms?: number;
    orientation?: string;
    rent_guarantee_insurance?: boolean;
    service_tags?: any[];
    images: PossessionAdImage[];
    posted_at?: string | null;
    paused_at?: string | null;
    archived_at?: string | null;
    total_views?: number;
    total_applications?: number;
    admin_note?: string;
    created_at?: string;
    updated_at?: string;
}

export interface PossessionItem {
    id: number;
    ad: number;
    ad_details: PossessionAdDetails;
    created_at: string;
}

export interface PossessionsResponse {
    success: boolean;
    message: string;
    possessions: {
        count: number;
        ad_details: PossessionItem[];
    };
    error: boolean;
}

export const possessionsApi = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getPossessions: build.query<PossessionsResponse, number | void>({
            query: (userId) => ({
                url: "/tenant/possessions/",
                method: "GET",
                params: userId ? { user_id: userId } : {},
            }),
            providesTags: ["Possessions"],
        }),
        createPossession: build.mutation({
            query: (data: { ad: number }) => {
                const formData = new FormData();
                formData.append("ad", data.ad.toString());
                return {
                    url: "/tenant/possessions/",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ["Possessions"],
        }),
    }),
});

export const { useGetPossessionsQuery, useCreatePossessionMutation } = possessionsApi;
