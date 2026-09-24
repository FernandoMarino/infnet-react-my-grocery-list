import { ISaveUserDTO } from "../dtos/ISaveUserDTO.js";
import { IUser } from "../interfaces/IUser.js";
import { IUserRepository } from "./IUserRepository.js";
import crypto from "crypto";

export class InMemoryUserRepository extends IUserRepository {
    private users: IUser[] = [];

    async saveUser(payload: ISaveUserDTO): Promise<IUser> {
        const creationTimestamp = new Date();
        const newUser: IUser = {
            id: crypto.randomUUID(),
            name: payload.name,
            email: payload.email,
            passwordHash: payload.passwordHash ?? null,
            googleUuid: payload.googleUuid ?? null,
            createdAt: creationTimestamp,
            updatedAt: creationTimestamp,
        };

        this.users.push(newUser);
        return newUser;
    }

    async getByEmail(email: string): Promise<IUser | null> {
        
        const user = this.users.find(user => user.email.toLowerCase() === email.toLowerCase())

        if (!user) {
            return null
        }
        
        return user;
    }

    async getById(id: string): Promise<IUser | null> {
        const user = this.users.find(user => user.id === id)

        if (!user) {
            return null
        }
        
        return user;
    }
}
