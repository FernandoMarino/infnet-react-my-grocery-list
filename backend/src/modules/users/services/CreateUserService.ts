import { AppError } from "../../../shared/errors/AppError.js";
import { ICreateUserDTO } from "../dtos/CreateUserDTO.js";
import { ISaveUserDTO } from "../dtos/ISaveUserDTO.js";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO.js";
import { IHashProvider } from "../providers/IHashProvider.js";
import { IUserRepository } from "../repositories/IUserRepository.js";

export class CreateUserService {
    private readonly userRepository: IUserRepository;
    private readonly hashProvider: IHashProvider;

    constructor(userRepository: IUserRepository, hashProvider: IHashProvider) {
        this.userRepository = userRepository;
        this.hashProvider = hashProvider;
    }

    async execute(user: ICreateUserDTO): Promise<IUserResponseDTO> {
        const userExists = await this.userRepository.getByEmail(user.email);
        // console.log(`user: ${userExists}`);
        
        if (userExists) {
            throw new AppError("Email is already in use", 409);
        }

        const userPayload: ISaveUserDTO = {
            name: user.name,
            email: user.email,
            passwordHash: await this.hashProvider.generateHash(user.password),
            role: user.role,
        };

        const newUser = await this.userRepository.saveUser(userPayload);

        if (!newUser) {
            throw new AppError("User creation failed", 500);
        }

        return newUser;
    }
}
