import "dotenv/config";
import jwt from "jsonwebtoken";
import { AppError } from "../../../shared/errors/AppError.js";
import { AuthenticateUserDTO } from "../dtos/AuthenticateUserDTO.js";
import { IHashProvider } from "../providers/IHashProvider.js";
import { IUserRepository } from "../repositories/IUserRepository.js";
import { authConfig } from "../../../shared/config/authConfig.js";
import { IUser } from "../interfaces/IUser.js";

export class AuthenticateUserService {
    private readonly userRepository: IUserRepository;
    private readonly hashProvider: IHashProvider;

    constructor(userRepository: IUserRepository, hashProvider: IHashProvider) {
        this.userRepository = userRepository;
        this.hashProvider = hashProvider;
    }

    async execute(
        payload: AuthenticateUserDTO
    ): Promise<{ user: Omit<IUser, "passwordHash">; token: string }> {
        const { email, password } = payload;
        if (!password) {
            throw new AppError("Invalid Credentials", 400);
        }

        const user = await this.userRepository.getByEmail(email);
        if (!user) {
            throw new AppError("Invalid Credentials", 401);
        }

        if (!user.passwordHash) {
            throw new AppError("Invalid Credentials", 401);
        }

        const validPassword = await this.hashProvider.compareHash(
            password,
            user.passwordHash,
        );
        if (!validPassword) {
            throw new AppError("Invalid Credentials", 401);
        }

        const { passwordHash, ...userWithoutPassword } = user;

        const token = jwt.sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });
        return {
            user: userWithoutPassword,
            token,
        };
    }
}
