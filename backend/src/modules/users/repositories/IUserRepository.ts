import { ISaveUserDTO } from "../dtos/ISaveUserDTO.js";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO.js";
export abstract class IUserRepository {
    abstract saveUser(data: ISaveUserDTO): Promise<IUserResponseDTO>;
    abstract getByEmail(email: string): Promise<IUserResponseDTO | null>;
    abstract getById(id: string): Promise<IUserResponseDTO | null>;
    abstract getAll(): Promise<IUserResponseDTO[]>;
}
