import { AppError } from "../../../../shared/errors/AppError";
import { IShoppingListRepository } from "../../repositories/IShoppingListRepository";
import { UpdateOrDeleteItemDTO } from "./ChangeItemCheckedService";

export class DeleteShoppingItemService {
    constructor(
        private readonly shoppingListRepository: IShoppingListRepository,
    ) {}

    async execute(data: UpdateOrDeleteItemDTO) {        

        const list = await this.shoppingListRepository.getListById(data.listId);

        if (!list) {
            throw new AppError("Shopping list not found", 404);
        }

        if (list.userId !== data.userId) {
            throw new AppError(
                "You do not have permission to access this list",
                403,
            );
        }

        return await this.shoppingListRepository.removeItem(data.listId, data.itemId);
    }
}
