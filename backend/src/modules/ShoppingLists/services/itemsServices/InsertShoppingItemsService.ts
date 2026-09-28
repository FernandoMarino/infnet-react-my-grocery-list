import { AppError } from "../../../../shared/errors/AppError";
import { InsertShoppingItemDTO } from "../../dtos/InsertShoppingItemDTO";
import { IShoppingListRepository } from "../../repositories/IShoppingListRepository";

export class InsertShoppingItemsService {
    constructor(
        private readonly shoppingListRepository: IShoppingListRepository,
    ) {}

    async execute(data: InsertShoppingItemDTO) {
        const updatedList = await this.shoppingListRepository.insertItem(
            data.listId,
            data.payload,
        );

        if (!updatedList) {
            const listExists = await this.shoppingListRepository.getListById(
                data.listId,
            );

            if (!listExists) {
                throw new AppError("Shopping list not found", 404);
            }
            throw new AppError(
                `The item ${data.payload.name.trim()} is already in the list`,
                409,
            );
        }

        return updatedList;
    }
}
