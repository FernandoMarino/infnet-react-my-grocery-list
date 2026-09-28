import { InsertShoppingItemController } from "../controllers/InsertShoppingItemController";
import { shoppingListRepository } from "../DIcontainer";
import { InsertShoppingItemsService } from "../services/itemsServices/InsertShoppingItemsService";

export function makeInsertShoppingItemController() {
    const insertShoppingItemService = new InsertShoppingItemsService(
        shoppingListRepository,
    );

    return new InsertShoppingItemController(insertShoppingItemService);
}
