import { storeRepository, userStoreRepository } from "../repositories";
import { StoreService } from "./StoreService";

export const storesServices = new StoreService(storeRepository, userStoreRepository)