import { AppError } from "../../../shared/errors/AppError.js";
import { CreateUserDTO } from "../dtos/CreateUserDTO.js";
import { SaveUserDTO } from "../dtos/SaveUserDTO.js";
import { User } from "../entities/User.js";
import { IHashProvider } from "../providers/IHashProvider.js";
import { IUserRepository } from "../repositories/IUserRepository.js";

export class CreateUserService {
    private readonly userRepository: IUserRepository;
    private readonly hashProvider: IHashProvider;

    constructor(userRepository: IUserRepository, hashProvider: IHashProvider) {
        this.userRepository = userRepository;
        this.hashProvider = hashProvider;
    }

    async execute(user: CreateUserDTO) {
        const userExists = await this.userRepository.findByEmail(user.email);
        if (userExists) {
            throw new AppError("Email is already in use", 409);
        }

        if (!user.googleUuid && !user.password) {
            throw new AppError("Missing Google ID or Password", 400);
        }

        const userPayload: SaveUserDTO = {
            name: user.name,
            email: user.email,
            passwordHash: user.password
                ? await this.hashProvider.generateHash(user.password)
                : null,
            googleUuid: user.googleUuid ?? null,
        };

        const newUser: User = await this.userRepository.createUser(userPayload);

        if (!newUser) {
            throw new AppError("User creation failed", 500);
        }

        const { passwordHash, ...userWithoutPassword } = newUser;

        return userWithoutPassword;
    }
}
