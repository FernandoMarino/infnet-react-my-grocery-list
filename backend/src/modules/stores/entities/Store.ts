export interface Store {
    id: string;
    googlePlaceId?: string | null;
    name: string; 
    address?: string | null;
    city?: string | null;
    province?: string | null;
    postalCode?: string | null;
    country?: string | null;
    createdAt: Date;
    updatedAt: Date;
}