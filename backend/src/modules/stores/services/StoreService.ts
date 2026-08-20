import { AppError } from "../../../shared/errors/AppError";
import { CreateStoreDTO } from "../dtos/CreateStoreDTO";
import { SaveStoreDTO } from "../dtos/SaveStoreDTO";
import { SaveUserStoreDTO } from "../dtos/SaveUserStoreDTO";
import { Store } from "../entities/Store";
import { IStoreRepository } from "../repositories/IStoreRepository";
import { IUserStoreRepository } from "../repositories/IUserStoreRepository";

export class StoreService {
    constructor(
        private readonly storeRepository: IStoreRepository,
        private readonly userStoreRepository: IUserStoreRepository,
    ) {}

    async createStore(data: CreateStoreDTO, userId: string): Promise<Store> {
        const storeExists = await this.storeRepository.findByName(
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
                throw new AppError(
                    "Store already registered for this user",
                    409,
                );
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

    async findStoresByUser(userId: string): Promise<Store[]> {
        const userStores = await this.userStoreRepository.findByUser(userId);

        if (userStores.length === 0) {
            throw new AppError("This user has no stores registered", 404);
        }

        const promises = userStores.map((userStore) =>
            this.storeRepository.findById(userStore.storeId),
        );

        // Promise all faz com que a função espere todas as promises serem resolvidas antes de proseguir
        const stores = (await Promise.all(promises)) as Store[];

        return stores;
    }
}
