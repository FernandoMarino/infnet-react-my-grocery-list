import { CreateUserController } from "../controllers/CreateUserController";
import { hashProvider, userRepository } from "../DIcontainer";
import { CreateUserService } from "../services/CreateUserService";

export function makeCreateUserController() {
    const createUserService = new CreateUserService(
        userRepository,
        hashProvider,
    );

    return new CreateUserController(createUserService);
}

