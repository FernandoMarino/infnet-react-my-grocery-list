import { Router } from "express";
import { CreateStoreService } from "../services/CreateStoreService.js";
import { InMemoryStoreRepository } from "../repositories/InMemoryStoreRepository.js";
import { InMemoryUserStoreRepository } from "../repositories/InMemoryUserStoreRepository.js";
import { CreateStoreController } from "../controllers/CreateStoreController.js";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated.js";
import { validateBody } from "../../../shared/middlewares/validateBody.js";
import CreateStoreSchema from "../schemas/CreateStoreSchema.js";

const router = Router();

const storeRepository = new InMemoryStoreRepository();
const userStoreRepository = new InMemoryUserStoreRepository();

const createStoreService = new CreateStoreService(
    storeRepository,
    userStoreRepository,
);

const createStoreController = new CreateStoreController(createStoreService);

router.post(
    "/",
    ensureAuthenticated,
    validateBody(CreateStoreSchema),
    createStoreController.handle,
);

export default router;
