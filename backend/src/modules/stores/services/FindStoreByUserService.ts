import { AppError } from "../../../shared/errors/AppError";
import { Store } from "../entities/Store";
import { IStoreRepository } from "../repositories/IStoreRepository";
import { IUserStoreRepository } from "../repositories/IUserStoreRepository";

export class FindStoresByUserService {
    constructor(
        private readonly storeRepository: IStoreRepository,
        private readonly userStoreRepository: IUserStoreRepository,
    ) {}

    async execute(userId: string): Promise<Store[]> {
        const stores: Store[] = [];

        const userStores = await this.userStoreRepository.findByUser(userId);

        if (!userStores) {
            throw new AppError("This user has no stores registered", 404);
        }

        userStores.map(
            async (userStore) =>
                await this.storeRepository
                    .findById(userStore.storeId)
                    .then((data) => {
                        if (data) stores.push(data);
                    }),
        );

        return stores;
    }
}
