import type { PublicAd, ApartmentCardData } from '../types/apartment.types';

export const transformApartmentData = (
  ads: PublicAd[],
  favoritesMap: Map<number, number>,
  roomsFilter?: number | null
): ApartmentCardData[] => {
  let filtered = ads;

  // Apply client-side room filtering if needed
  if (roomsFilter) {
    filtered = ads.filter(ad => ad.rooms >= roomsFilter);
  }

  return filtered.map(ad => ({
    id: ad.id,
    imageUrl: ad.images?.find(img => img.is_primary)?.image || ad.images?.[0]?.image || '',
    price: `€${ad.rent?.toLocaleString() || '0'}`,
    frequency: '/month CC',
    title: ad.title || 'Untitled Property',
    location: `${ad.city || ''}, ${ad.postal_code || ''}`.trim().replace(/^,|,$/, ''),
    details: {
      furniture: ad.rental_type === 'furnished',
      rooms: ad.rooms?.toString() || '0',
      area: `${ad.surface_sqm || 0} m²`,
    },
    favoriteId: favoritesMap.get(ad.id),
  }));
};

export const createFavoritesMap = (favoritesData: any): Map<number, number> => {
  const favoritesMap = new Map<number, number>();

  if (favoritesData?.favorites) {
    favoritesData.favorites.forEach((fav: any) => {
      favoritesMap.set(fav.ad, fav.id);
    });
  } else if (favoritesData?.results) {
    favoritesData.results.forEach((fav: any) => {
      const adId = fav.ad || fav.property_details?.id;
      if (adId) favoritesMap.set(adId, fav.id);
    });
  }

  return favoritesMap;
};