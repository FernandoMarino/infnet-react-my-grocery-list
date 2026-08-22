import { describe, expect, test, jest } from "@jest/globals";
import { CreateUserService } from "../CreateUserService.js";
import { InMemoryUserRepository } from "../../repositories/InMemoryUserRepository.js";
import { IHashProvider } from "../../providers/IHashProvider.js";
import { AppError } from "../../../../shared/errors/AppError.js";

// Mock do HashProvider para evitar lentidão do bcrypt em testes
class FakeHashProvider implements IHashProvider {
    async generateHash(payload: string): Promise<string> {
        return `hashed_${payload}`;
    }
    async compareHash(payload: string, hashed: string): Promise<boolean> {
        return `hashed_${payload}` === hashed;
    }
}

describe("CreateUserService", () => {
    test("should be able to create a new user with password", async () => {
        const userRepository = new InMemoryUserRepository();
        const hashProvider = new FakeHashProvider();
        const createUserService = new CreateUserService(userRepository, hashProvider);

        const user = await createUserService.execute({
            name: "John Doe",
            email: "john@example.com",
            password: "any_password",
        });

        expect(user).toHaveProperty("id");
        expect(user.name).toBe("John Doe");
        expect(user.email).toBe("john@example.com");
        // Verifica se a senha foi removida do objeto de retorno
        expect(user).not.toHaveProperty("passwordHash");
        expect(user).not.toHaveProperty("password");
    });

    test("should be able to create a new user with Google UUID (no password)", async () => {
        const userRepository = new InMemoryUserRepository();
        const hashProvider = new FakeHashProvider();
        const createUserService = new CreateUserService(userRepository, hashProvider);

        const user = await createUserService.execute({
            name: "Google User",
            email: "google@example.com",
            googleUuid: "google-oauth-id-123",
        });

        expect(user).toHaveProperty("id");
        expect(user.name).toBe("Google User");
        expect(user.email).toBe("google@example.com");
        expect(user.googleUuid).toBe("google-oauth-id-123");
    });

    test("should not be able to create a new user with an email that is already in use", async () => {
        const userRepository = new InMemoryUserRepository();
        const hashProvider = new FakeHashProvider();
        const createUserService = new CreateUserService(userRepository, hashProvider);

        await createUserService.execute({
            name: "John Doe",
            email: "duplicate@example.com",
            password: "any_password",
        });

        await expect(
            createUserService.execute({
                name: "Another John",
                email: "duplicate@example.com",
                password: "another_password",
            })
        ).rejects.toBeInstanceOf(AppError);

        try {
            await createUserService.execute({
                name: "Another John",
                email: "duplicate@example.com",
                password: "another_password",
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            const appError = error as AppError;
            expect(appError.statusCode).toBe(409);
            expect(appError.message).toBe("Email is already in use");
        }
    });

    test("should not be able to create a new user without password and without Google UUID", async () => {
        const userRepository = new InMemoryUserRepository();
        const hashProvider = new FakeHashProvider();
        const createUserService = new CreateUserService(userRepository, hashProvider);

        await expect(
            createUserService.execute({
                name: "Invalid User",
                email: "invalid@example.com",
            })
        ).rejects.toBeInstanceOf(AppError);

        try {
            await createUserService.execute({
                name: "Invalid User",
                email: "invalid@example.com",
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            const appError = error as AppError;
            expect(appError.statusCode).toBe(400);
            expect(appError.message).toBe("Missing Google ID or Password");
        }
    });
});
