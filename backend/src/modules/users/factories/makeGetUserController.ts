import { GetUsersController } from "../controllers/GetUsersController";
import { userRepository } from "../DIcontainer";
import { GetUsersService } from "../services/GetUsersService";

export function makeGetUserController() {
    const getUsersService = new GetUsersService(userRepository);

    return new GetUsersController(getUsersService);
}
