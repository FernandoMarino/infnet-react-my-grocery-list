import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepository } from "../../../users/repositories/IUserRepository";
import { IShoppingListRepository } from "../../repositories/IShoppingListRepository";

export class GetShoppingListService {
    constructor(
        private readonly shoppingListRepository: IShoppingListRepository,
        private readonly userRepository: IUserRepository,
    ) {}

    async execute(userId: string, listId: string) {
        const userExists = await this.userRepository.getById(userId);

        if (!userExists) {
            throw new AppError("User does not exist", 404);
        }

        const list = await this.shoppingListRepository.getListById(listId);

        if (!list) {
            throw new AppError("Shopping list not found", 404);
        }

        if (list.userId !== userId) {
            throw new AppError(
                "You do not have permission to access this list",
                403,
            );
        }

        return list;
    }
}
