// Configura JWT_SECRET antes de importar qualquer modulo que dependa de authConfig
process.env['JWT_SECRET'] = "test_jwt_secret_value_for_testing_only_1234567890";

import { describe, expect, test } from "@jest/globals";
import { AuthenticateUserService } from "../AuthenticateUserService.js";
import { InMemoryUserRepository } from "../../repositories/InMemoryUserRepository.js";
import { IHashProvider } from "../../providers/IHashProvider.js";
import { AppError } from "../../../../shared/errors/AppError.js";

class FakeHashProvider implements IHashProvider {
    async generateHash(payload: string): Promise<string> {
        return `hashed_${payload}`;
    }
    async compareHash(payload: string, hashed: string): Promise<boolean> {
        return `hashed_${payload}` === hashed;
    }
}

describe("AuthenticateUserService", () => {
    test("should be able to authenticate a user with valid credentials", async () => {
        const userRepository = new InMemoryUserRepository();
        const hashProvider = new FakeHashProvider();
        const authenticateUserService = new AuthenticateUserService(userRepository, hashProvider);

        // Primeiro, criamos um usuário no repositório
        const passwordHash = await hashProvider.generateHash("correct_password");
        const user = await userRepository.saveUser({
            name: "John Doe",
            email: "john@example.com",
            passwordHash,
            googleUuid: null,
        });

        const response = await authenticateUserService.execute({
            email: "john@example.com",
            password: "correct_password",
        });

        expect(response).toHaveProperty("token");
        expect(response.user.email).toBe("john@example.com");
        expect(response.user.id).toBe(user.id);
        expect(response.user).not.toHaveProperty("passwordHash");
    });

    test("should not be able to authenticate with missing password", async () => {
        const userRepository = new InMemoryUserRepository();
        const hashProvider = new FakeHashProvider();
        const authenticateUserService = new AuthenticateUserService(userRepository, hashProvider);

        await expect(
            authenticateUserService.execute({
                email: "john@example.com",
                password: "",
            })
        ).rejects.toBeInstanceOf(AppError);

        try {
            await authenticateUserService.execute({
                email: "john@example.com",
                password: "",
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            const appError = error as AppError;
            expect(appError.statusCode).toBe(400);
            expect(appError.message).toBe("Invalid Credentials");
        }
    });

    test("should not be able to authenticate with a non-existent email", async () => {
        const userRepository = new InMemoryUserRepository();
        const hashProvider = new FakeHashProvider();
        const authenticateUserService = new AuthenticateUserService(userRepository, hashProvider);

        await expect(
            authenticateUserService.execute({
                email: "nonexistent@example.com",
                password: "any_password",
            })
        ).rejects.toBeInstanceOf(AppError);

        try {
            await authenticateUserService.execute({
                email: "nonexistent@example.com",
                password: "any_password",
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            const appError = error as AppError;
            expect(appError.statusCode).toBe(401);
            expect(appError.message).toBe("Invalid Credentials");
        }
    });

    test("should not be able to authenticate a user that has no password (e.g. Google-only user)", async () => {
        const userRepository = new InMemoryUserRepository();
        const hashProvider = new FakeHashProvider();
        const authenticateUserService = new AuthenticateUserService(userRepository, hashProvider);

        // Salva usuário sem hash de senha
        await userRepository.saveUser({
            name: "Google User",
            email: "google@example.com",
            passwordHash: null,
            googleUuid: "google-uuid-123",
        });

        await expect(
            authenticateUserService.execute({
                email: "google@example.com",
                password: "any_password",
            })
        ).rejects.toBeInstanceOf(AppError);

        try {
            await authenticateUserService.execute({
                email: "google@example.com",
                password: "any_password",
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            const appError = error as AppError;
            expect(appError.statusCode).toBe(401);
            expect(appError.message).toBe("Invalid Credentials");
        }
    });

    test("should not be able to authenticate with wrong password", async () => {
        const userRepository = new InMemoryUserRepository();
        const hashProvider = new FakeHashProvider();
        const authenticateUserService = new AuthenticateUserService(userRepository, hashProvider);

        const passwordHash = await hashProvider.generateHash("correct_password");
        await userRepository.saveUser({
            name: "John Doe",
            email: "john@example.com",
            passwordHash,
            googleUuid: null,
        });

        await expect(
            authenticateUserService.execute({
                email: "john@example.com",
                password: "wrong_password",
            })
        ).rejects.toBeInstanceOf(AppError);

        try {
            await authenticateUserService.execute({
                email: "john@example.com",
                password: "wrong_password",
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            const appError = error as AppError;
            expect(appError.statusCode).toBe(401);
            expect(appError.message).toBe("Invalid Credentials");
        }
    });
});
