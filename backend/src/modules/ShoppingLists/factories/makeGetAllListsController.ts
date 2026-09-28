import { GetAllListsController } from "../controllers/GetAllShoppingListsController";
import { shoppingListRepository } from "../DIcontainer";
import { GetAllShoppingListsService } from "../services/itemsServices/GetAllShoppingListsService";

export function makeGetAllShoppingListsController() {
    const getAllShoppingListsService = new GetAllShoppingListsService(
        shoppingListRepository,
    );
    return new GetAllListsController(getAllShoppingListsService);
}
