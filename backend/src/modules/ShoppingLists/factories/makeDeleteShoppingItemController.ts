import { DeleteShoppingItemController } from "../controllers/DeleteShoppingItemController";
import { shoppingListRepository } from "../DIcontainer";
import { DeleteShoppingItemService } from "../services/itemsServices/DeleteShoppingItemService";

export function makeDeleteShoppingItemController() {
    const deleteItemService = new DeleteShoppingItemService(
        shoppingListRepository,
    );
    return new DeleteShoppingItemController(deleteItemService);
}
