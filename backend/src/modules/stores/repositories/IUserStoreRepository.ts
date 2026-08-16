
import { SaveUserStoreDTO } from "../dtos/SaveUserStoreDTO.js";
import { UserStore } from "../entities/UserStore.js";

export abstract class IUserStoreRepository {
    abstract saveUserStore(data: SaveUserStoreDTO): Promise<UserStore>;
    abstract findByUserAndStore(userId: string, storeId: string): Promise<UserStore | null>;
    abstract findByUser(id: string): Promise<UserStore[]>;
    
}