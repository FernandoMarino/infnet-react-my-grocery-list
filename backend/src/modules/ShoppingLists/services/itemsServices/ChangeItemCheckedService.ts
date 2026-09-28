import { AppError } from "../../../../shared/errors/AppError";
import { IShoppingListRepository } from "../../repositories/IShoppingListRepository";
import { ShoppingListRepositoryMongoDB } from "../../repositories/ShoppingListRepositoryMongoDB";

export interface UpdateOrDeleteItemDTO {
    userId: string;
    listId: string;
    itemId: string;
}

export class ChangeItemCheckedService {
    constructor(
        private readonly shoppingListRepository: IShoppingListRepository,
    ) {}

    async execute(data: UpdateOrDeleteItemDTO) {
        const list = await this.shoppingListRepository.getListById(data.listId);

        if (!list) {
            throw new AppError("List not found", 404);
        }
        if (list.userId !== data.userId) {
            throw new AppError(
                "You do not have permission to update this list",
                403,
            );
        }

        const currentItem = list.items?.find((i) => i._id === data.itemId);

        const updatedList = await this.shoppingListRepository.updateItem(
            data.listId,
            data.itemId,
            { checked: !currentItem?.checked },
        );

        return updatedList;
    }
}
