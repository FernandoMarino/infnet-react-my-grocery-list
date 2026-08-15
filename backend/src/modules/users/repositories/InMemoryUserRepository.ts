import { AppError } from "../../../shared/errors/AppError.js";
import { CreateUserDTO } from "../dtos/CreateUserDTO.js";
import { SaveUserDTO } from "../dtos/SaveUserDTO.js";
import { User } from "../entities/User.js";
import { IUserRepository } from "./IUserRepository.js";
import crypto from "crypto";

export class InMemoryUserRepository extends IUserRepository {
    private users: User[] = [];

    async createUser(data: SaveUserDTO): Promise<User> {
        const creationTimestamp = new Date();
        const newUser: User = {
            id: crypto.randomUUID(),
            name: data.name,
            email: data.email,
            passwordHash: data.passwordHash ?? null,
            googleUuid: data.googleUuid ?? null,
            createdAt: creationTimestamp,
            updatedAt: creationTimestamp,
        };

        this.users.push(newUser);
        return newUser;
    }

    async findByEmail(email: string): Promise<User | null> {
        
        const user = this.users.find(user => user.email.toLowerCase() === email.toLowerCase())

        if (!user) {
            return null
        }
        
        return user;
    }

    async findById(id: string): Promise<User | null> {
        const user = this.users.find(user => user.id === id)

        if (!user) {
            return null
        }
        
        return user;
    }
}
