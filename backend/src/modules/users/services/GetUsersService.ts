import { AppError } from "../../../shared/errors/AppError.js";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO.js";
import { IUserRepository } from "../repositories/IUserRepository.js";

export class GetUsersService {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(): Promise<IUserResponseDTO[]> {
        const users = await this.userRepository.getAll();
        if (users.length === 0) {
            throw new AppError("No users registered", 404);
        }

        return users;
    }
}
