import { randomUUID } from "crypto";
import { SaveUserStoreDTO } from "../dtos/SaveUserStoreDTO.js";
import { UserStore } from "../entities/UserStore.js";
import { IUserStoreRepository } from "./IUserStoreRepository.js";

export class InMemoryUserStoreRepository extends IUserStoreRepository {
    
    private userStores: UserStore[] = []

    async saveUserStore(data: SaveUserStoreDTO): Promise<UserStore> {
        
        const creationDate = new Date()

        const newUserStore: UserStore = {
            id: randomUUID(),
            userId: data.userId,
            storeId: data.storeId,
            createdAt: creationDate,
        }

        this.userStores.push(newUserStore)

        return newUserStore
    }

    async findByUserAndStore(userId: string, storeId: string): Promise<UserStore | null> {
        const userStores = this.userStores.find(item => item.userId === userId && item.storeId === storeId) ?? null;
        return userStores
    }

    async findByUser(userId: string): Promise<UserStore[]> {
        const userStores = this.userStores.filter(item => item.userId === userId);
        return userStores
    }

}