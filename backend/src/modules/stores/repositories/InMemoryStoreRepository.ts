import { randomUUID } from "crypto";
import { SaveStoreDTO } from "../dtos/SaveStoreDTO.js";
import { Store } from "../entities/Store.js";
import { IStoreRepository } from "./IStoreRepository.js";

export class InMemoryStoreRepository extends IStoreRepository {
    
    private stores: Store[] = []

    async saveStore(data: SaveStoreDTO): Promise<Store> {
        
        const creationDate = new Date()

        const newStore: Store = {
            id: crypto.randomUUID(),
            googlePlaceId: data.googlePlaceId ?? null,
            name: data.name,
            address: data.address ?? null,
            city: data.city ?? null,
            province: data.province ?? null,
            postalCode: data.postalCode ?? null,
            country: data.country ?? null,
            createdAt: creationDate,
            updatedAt: creationDate
        }

        this.stores.push(newStore)

        return newStore
    }

    async findByName(name: string): Promise<Store | null> {
        const store = this.stores.find(store => store.name.toLowerCase() === name.toLowerCase()) ?? null
        return store
    }

    async findById(id: string): Promise<Store | null> {
        const store = this.stores.find(store => store.id === id) ?? null
        return store
    }

    async findByGooglePlaceId(googlePlaceId: string): Promise<Store | null> {
        const store = this.stores.find(store => store.googlePlaceId === googlePlaceId) ?? null
        return store    
    }
}