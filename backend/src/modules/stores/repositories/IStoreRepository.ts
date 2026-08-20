import { SaveStoreDTO } from "../dtos/SaveStoreDTO.js";
import { Store } from "../entities/Store.js";

export abstract class IStoreRepository {
    abstract saveStore(data: SaveStoreDTO): Promise<Store>;
    abstract findById(id: string): Promise<Store | null>;
    abstract findByName(name: string): Promise<Store | null>;
    abstract findByGooglePlaceId(googleId: string): Promise<Store | null>;
    abstract updateStore(storeId: string, payload: SaveStoreDTO): Promise<Store>
}