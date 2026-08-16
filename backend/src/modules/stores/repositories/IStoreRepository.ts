import { SaveStoreDTO } from "../dtos/SaveStoreDTO.js";
import { Store } from "../entities/Store.js";

export abstract class IStoreRepository {
    abstract saveStore(data: SaveStoreDTO): Promise<Store>;
    abstract findByStoreName(name: string): Promise<Store | null>;
    abstract findById(id: string): Promise<Store | null>;
    abstract findByGooglePlaceId(googleId: string): Promise<Store | null>;
}