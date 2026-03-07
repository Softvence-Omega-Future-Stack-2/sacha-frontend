export interface AdImage {
  id: number;
  ad: number;
  image: string;
  alt_text: string;
  caption: string;
  is_primary: boolean;
  sort_order: number;
  created_at: string;
}

export interface PublicAd {
  id: number;
  owner: number;
  status: 'draft' | 'published' | 'paused' | 'archived';
  title: string;
  description: string;
  address: string;
  display_address: string;
  show_exact_address: boolean;
  city: string;
  postal_code: string;
  property_type: 'studio' | 'apartment' | 'house' | 'room';
  rental_type: 'furnished' | 'unfurnished';
  available_from: string;
  rent: number;
  monthly_charges: number;
  deposit: number;
  surface_sqm: number;
  rooms: number;
  pieces: number;
  floor: number;
  built_year: number;
  dpe: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  ghg: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  furnished: boolean;
  bedrooms: number;
  bathrooms: number;
  orientation: 'north' | 'south' | 'east' | 'west' | 'northeast' | 'northwest' | 'southeast' | 'southwest';
  rent_guarantee_insurance: boolean;
  service_tags: string[];
  images: AdImage[];
  posted_at: string;
  paused_at: string | null;
  archived_at: string | null;
  total_views: number;
  total_applications: number;
  admin_note: string;
  created_at: string;
  updated_at: string;
}

export interface PublicAdsQueryParams {
  property_type?: string;
  city?: string;
  rental_type?: string;
  min_rent?: number;
  max_rent?: number;
  rooms?: number;
  page?: number;
  limit?: number;
}

export interface ApartmentCardData {
  id: number;
  imageUrl: string;
  price: string;
  frequency: string;
  title: string;
  location: string;
  details: {
    furniture: boolean;
    rooms: string;
    area: string;
  };
  favoriteId?: number;
}