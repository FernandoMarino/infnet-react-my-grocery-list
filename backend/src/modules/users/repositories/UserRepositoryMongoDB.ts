import { ISaveUserDTO } from "../dtos/ISaveUserDTO.js";
import { UserModel } from "../models/userModel.js";
import { IUserRepository } from "./IUserRepository.js";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO.js";

export class UserRepositoryMongoDB extends IUserRepository {
    async saveUser(user: ISaveUserDTO): Promise<IUserResponseDTO> {
        const newUser = new UserModel(user);
        const saved = await newUser.save();

        const userObj = saved.toObject();
        const { passwordHash, _id, __v, ...userResponse } = userObj;

        return {
            id: _id.toString(),
            ...userResponse,
        } as IUserResponseDTO;
    }

    async getByEmail(email: string): Promise<IUserResponseDTO | null> {
        throw new Error("Method not implemented.");
    }
    async getById(id: string): Promise<IUserResponseDTO | null> {
        throw new Error("Method not implemented.");
    }

    async getAll(): Promise<IUserResponseDTO[]> {
        const users = await UserModel.find();

        return users.map((user) => {
            const userObj = user.toObject();
            const { passwordHash, _id, __v, ...userResponse } = userObj;

            return {
                id: _id.toString(),
                ...userResponse,
            } as IUserResponseDTO;
        });
    }
}
