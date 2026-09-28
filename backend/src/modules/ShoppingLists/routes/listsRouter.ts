import { Router } from "express";
import { validateBody } from "../../../shared/middlewares/validateBody";
import CreateShoppingListZodSchema from "../zodschemas/CreateShoppingListZodSchema";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";
import { makeCreateShoppingListController } from "../factories/makeCreateShoppingListController";
import { makeInsertShoppingItemController } from "../factories/makeInsertShoppingItemController";
import InsertShoppingItemZodSchema from "../zodschemas/InsertShoppingItemZodSchema";
import { makeGetAllShoppingListsController } from "../factories/makeGetAllListsController";
import { makeChangeItemCheckedController } from "../factories/makeChangeItemCheckedController";
import { makeDeleteShoppingItemController } from "../factories/makeDeleteShoppingItemController";

const router = Router();

router.patch(
    "/:listId/:itemId/check",
    ensureAuthenticated,
    makeChangeItemCheckedController().handle,
);


router.delete(
    "/:listId/:itemId",
    ensureAuthenticated,
    makeDeleteShoppingItemController().handle,
);
router.post(
    "/:listId/",
    ensureAuthenticated,
    validateBody(InsertShoppingItemZodSchema),
    makeInsertShoppingItemController().handle,
);

router.post(
    "/",
    ensureAuthenticated,
    validateBody(CreateShoppingListZodSchema),
    makeCreateShoppingListController().handle,
);

router.get(
    '/',
    ensureAuthenticated,
    makeGetAllShoppingListsController().handle
)


export default router