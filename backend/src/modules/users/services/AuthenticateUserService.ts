import "dotenv/config";
import jwt from "jsonwebtoken";
import { AppError } from "../../../shared/errors/AppError.js";
import { AuthenticateUserDTO } from "../dtos/AuthenticateUserDTO.js";
import { IHashProvider } from "../providers/IHashProvider.js";
import { IUserRepository } from "../repositories/IUserRepository.js";
import { authConfig } from "../../../shared/config/authConfig.js";

export class AuthenticateUserService {
    private readonly userRepository: IUserRepository;
    private readonly hashProvider: IHashProvider;

    constructor(userRepository: IUserRepository, hashProvider: IHashProvider) {
        this.userRepository = userRepository;
        this.hashProvider = hashProvider;
    }

    async execute(
        payload: AuthenticateUserDTO,
    ): Promise<{ userId: string; token: string }> {
        const { email, password } = payload;
        if (!password) {
            throw new AppError("You must enter your password", 400);
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

        const token = jwt.sign({}, authConfig.jwt.secret, {
            subject: user._id.toString(),
            expiresIn: authConfig.jwt.expiresIn,
        });
        return {
            userId: user.email,
            token,
        };
    }
}
