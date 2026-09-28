import { ChangeItemCheckedController } from "../controllers/ChangeItemCheckedController";
import { shoppingListRepository } from "../DIcontainer";
import { ChangeItemCheckedService } from "../services/itemsServices/ChangeItemCheckedService";

export function makeChangeItemCheckedController() {
    const changeItemCheckedService = new ChangeItemCheckedService(
        shoppingListRepository,
    );

    return new ChangeItemCheckedController(changeItemCheckedService);
}
