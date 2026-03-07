import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { PublicAdsQueryParams } from '../types/apartment.types';

export const useApartmentFilters = () => {
  const [searchParams] = useSearchParams();

  const filters = useMemo(() => ({
    propertyType: searchParams.get('property_type') || '',
    location: searchParams.get('location') || '',
    priceRange: searchParams.get('price_range') || '',
    rentalType: searchParams.get('rental_type') || '',
    rooms: searchParams.get('rooms') || '',
  }), [searchParams]);

  const apiParams = useMemo((): PublicAdsQueryParams => {
    const params: PublicAdsQueryParams = {};

    if (filters.propertyType) params.property_type = filters.propertyType;
    if (filters.location) params.city = filters.location;
    if (filters.rentalType) params.rental_type = filters.rentalType;

    if (filters.priceRange) {
      if (filters.priceRange.startsWith('Over')) {
        params.min_rent = parseInt(filters.priceRange.replace(/[^0-9]/g, ''));
      } else {
        const match = filters.priceRange.match(/€([\d,]+) - €([\d,]+)/);
        if (match) {
          params.min_rent = parseInt(match[1].replace(/,/g, ''));
          params.max_rent = parseInt(match[2].replace(/,/g, ''));
        }
      }
    }

    return params;
  }, [filters]);

  const clientSideFilter = useMemo(() => ({
    rooms: filters.rooms ? parseInt(filters.rooms.replace('+', '')) : null,
  }), [filters.rooms]);

  return { filters, apiParams, clientSideFilter };
};