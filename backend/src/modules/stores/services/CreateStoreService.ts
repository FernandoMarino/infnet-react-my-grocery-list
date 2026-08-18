import { AppError } from "../../../shared/errors/AppError.js";
import { CreateStoreDTO } from "../dtos/CreateStoreDTO.js";
import { SaveStoreDTO } from "../dtos/SaveStoreDTO.js";
import { SaveUserStoreDTO } from "../dtos/SaveUserStoreDTO.js";
import { Store } from "../entities/Store.js";
import { IStoreRepository } from "../repositories/IStoreRepository.js";
import { IUserStoreRepository } from "../repositories/IUserStoreRepository.js";

export class CreateStoreService {
    constructor(
        private readonly storeRepository: IStoreRepository,
        private readonly userStoreRepository: IUserStoreRepository,
    ) {}

    async execute(data: CreateStoreDTO, userId: string): Promise<Store> {
        const storeExists = await this.storeRepository.findByStoreName(
            data.name,
        );

        if (!storeExists) {
            const createStorePayload: SaveStoreDTO = {
                name: data.name,
                googlePlaceId: data.googlePlaceId ?? null,
                address: data.address ?? null,
                city: data.city ?? null,
                province: data.province ?? null,
                postalCode: data.postalCode ?? null,
                country: data.country ?? null,
            };

            const savedStore =
                await this.storeRepository.saveStore(createStorePayload);

            if (!savedStore) {
                throw new AppError("Saving User Stores not successful", 500);
            }
            
            const createUserStorePayload: SaveUserStoreDTO = {
                storeId: savedStore.id,
                userId: userId,
            };
            
            await this.userStoreRepository.saveUserStore(
                createUserStorePayload,
            );
            
            return savedStore;
        } else {
            const userStores =
            await this.userStoreRepository.findByUserAndStore(
                userId,
                storeExists.id,
            );
            
            if (userStores) {
                throw new AppError("Store already registered for this user", 409);
            } else {
                const createUserStorePayload: SaveUserStoreDTO = {
                    storeId: storeExists.id,
                    userId: userId,
                };

                await this.userStoreRepository.saveUserStore(
                    createUserStorePayload,
                );

                return storeExists;
            }
        }
    }
}
