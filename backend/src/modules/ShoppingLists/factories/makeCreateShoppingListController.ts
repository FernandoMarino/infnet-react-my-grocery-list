import { CreateShoppingListController } from "../controllers/CreateShoppingListController";
import { shoppingListRepository } from "../DIcontainer";
import { CreateShoppingListService } from "../services/listsServices/CreateShoppingListService";

export function makeCreateShoppingListController() {
    const createShoppingListService = new CreateShoppingListService(
        shoppingListRepository,
    );

    return new CreateShoppingListController(createShoppingListService);
}
