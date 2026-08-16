import express from "express";
import { InMemoryUserRepository } from "../repositories/InMemoryUserRepository.js";
import { CreateUserService } from "../services/CreateUserService.js";
import { BcryptHashProvider } from "../providers/BcryptHashProvider.js";
import { validateBody } from "../../../shared/middlewares/validateBody.js";
import { CreateUserController } from "../controllers/CreateUserController.js";
import CreateUserSchema from "../schemas/CreateUserSchema.js";
import AuthenticateUserSchema from "../schemas/AuthenticateUserSchema.js";
import { AuthenticateUserService } from "../services/AuthenticateUserService.js";
import { AuthenticateUserController } from "../controllers/AuthenticateUserController.js";

const router = express.Router();

const userRepository = new InMemoryUserRepository();
const hashProvider = new BcryptHashProvider();

const createUserService = new CreateUserService(userRepository, hashProvider);
const createUserController = new CreateUserController(createUserService);

const authenticateUserService = new AuthenticateUserService(
    userRepository,
    hashProvider,
);
const authenticateUserController = new AuthenticateUserController(
    authenticateUserService,
);

router.post("/", validateBody(CreateUserSchema), createUserController.handle);
router.post(
    "/login",
    validateBody(AuthenticateUserSchema),
    authenticateUserController.handle,
);

export default router;
