import express from "express";
import { InMemoryUserRepository } from "../repositories/InMemoryUserRepository.js";
import { CreateUserService } from "../services/CreateUserService.js";
import { BcryptHashProvider } from "../providers/BcryptHashProvider.js";
import { validateBody } from "../../../shared/middlewares/validateBody.js";
import { CreateUserController } from "../controllers/CreateUserController.js";
import CreateUserSchema from "../schemas/CreateUserSchema.js";

const router = express.Router();

const userRepository = new InMemoryUserRepository();
const hashProvider = new BcryptHashProvider();

const createUserService = new CreateUserService(userRepository, hashProvider);

const createUserController = new CreateUserController(createUserService)

router.post("/", validateBody(CreateUserSchema), createUserController.handle);

export default router
