import { ISaveUserDTO } from "../dtos/ISaveUserDTO.js";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO.js";
import { IUser } from "../interfaces/IUser.js";
export abstract class IUserRepository {
    abstract saveUser(data: ISaveUserDTO): Promise<IUserResponseDTO>;
    abstract getByEmail(email: string): Promise<IUser | null>;
    abstract getById(id: string): Promise<IUserResponseDTO | null>;
    abstract getAll(): Promise<IUserResponseDTO[]>;
}
