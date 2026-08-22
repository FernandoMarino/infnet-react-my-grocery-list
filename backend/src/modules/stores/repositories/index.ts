import { InMemoryStoreRepository } from "./InMemoryStoreRepository";
import { InMemoryUserStoreRepository } from "./InMemoryUserStoreRepository";

export const storeRepository = new InMemoryStoreRepository()
export const userStoreRepository = new InMemoryUserStoreRepository()