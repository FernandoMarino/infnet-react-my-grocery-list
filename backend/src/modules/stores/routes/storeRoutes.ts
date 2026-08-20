import { Router } from "express";
import { InMemoryStoreRepository } from "../repositories/InMemoryStoreRepository";
import { InMemoryUserStoreRepository } from "../repositories/InMemoryUserStoreRepository";
import { CreateStoreController } from "../controllers/CreateStoreController";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";
import { validateBody } from "../../../shared/middlewares/validateBody";
import CreateStoreSchema from "../schemas/CreateStoreSchema";
import { StoreService } from "../services/StoreService";
import { FindStoresByUserController } from "../controllers/FindStoresByUserController";

const router = Router();

const storeRepository = new InMemoryStoreRepository();
const userStoreRepository = new InMemoryUserStoreRepository();

const storeService = new StoreService(storeRepository, userStoreRepository);

const createStoreController = new CreateStoreController(storeService);
const findStoresByUserController = new FindStoresByUserController(storeService);

router.post(
    "/",
    ensureAuthenticated,
    validateBody(CreateStoreSchema),
    createStoreController.handle,
);
router.get("/", ensureAuthenticated, findStoresByUserController.handle);

export default router;
