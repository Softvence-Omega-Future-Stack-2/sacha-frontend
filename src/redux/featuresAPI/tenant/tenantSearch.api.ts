import { baseAPI } from "../../baseAPI/baseApi";

export interface TenantSearchRequest {
    city?: string;
    postal_code?: string;
    property_type?: string;
    rental_type?: string;
    min_rent?: number;
    max_rent?: number;
    min_surface?: number;
    max_surface?: number;
    rooms?: number;
    bedrooms?: number;
    bathrooms?: number;
    furnished?: boolean;
    orientation?: string;
    search?: string;
}

export const tenantSearchApi = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getTenantSearch: build.query({
            query: (params: TenantSearchRequest) => {
                const queryParams = new URLSearchParams();
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        queryParams.append(key, value.toString());
                    }
                });
                return {
                    url: `/tenant/search/?${queryParams.toString()}`,
                    method: "GET",
                };
            },
            providesTags: ["Properties"], // Reusing Properties tag if applicable or just for caching
        }),
    }),
});

export const { useLazyGetTenantSearchQuery } = tenantSearchApi;
