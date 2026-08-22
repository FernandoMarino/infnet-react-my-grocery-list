import { Router } from "express";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";
import { validateBody } from "../../../shared/middlewares/validateBody";
import CreateStoreSchema from "../schemas/CreateStoreSchema";
import UpdateStoreSchema from "../schemas/UpdateStoreSchema";
import { createStoreController, deleteStoreController, findStoresByUserController, updateStoreController } from "../controllers";

const router = Router();


// Create (POST)
router.post(
    "/",
    ensureAuthenticated,
    validateBody(CreateStoreSchema),
    createStoreController.handle,
);

// Listar (GET)
router.get("/", ensureAuthenticated, findStoresByUserController.handle);

// Update (PUT)
router.put("/:id", ensureAuthenticated, validateBody(UpdateStoreSchema), updateStoreController.handle )

// Delete (DELETE)
router.delete("/:id", ensureAuthenticated, deleteStoreController.handle )


export default router;
