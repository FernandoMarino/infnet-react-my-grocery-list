import { hashProvider, userRepository } from "../DIcontainer";
import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

export function makeAuthenticateUserController() {
    const authenticateUserService = new AuthenticateUserService(
        userRepository,
        hashProvider,
    );

    return new AuthenticateUserController(authenticateUserService);
}
