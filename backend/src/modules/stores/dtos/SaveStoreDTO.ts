export interface SaveStoreDTO {
    name: string; 
    googlePlaceId?: string | null;
    address?: string | null;
    city?: string | null;
    province?: string | null;
    postalCode?: string | null;
    country?: string | null;
}