
import { SaveUserDTO } from "../dtos/SaveUserDTO.js";
import { User } from "../entities/User.js";

export abstract class IUserRepository {
    abstract saveUser(data: SaveUserDTO): Promise<User>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findById(id: string): Promise<User | null>;
}