import { ISaveUserDTO } from "../dtos/ISaveUserDTO.js";
import { UserModel } from "../models/userModel.js";
import { IUserRepository } from "./IUserRepository.js";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO.js";
import { IUser } from "../interfaces/IUser.js";

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

    async getByEmail(email: string): Promise<IUser | null> {
        const user = await UserModel.findOne({ email });
        return user;
    }
    async getById(id: string): Promise<IUserResponseDTO | null> {
        const user = await UserModel.findOne({ id }, { passwordHash: 0 });
        return user;
    }

    async getAll(): Promise<IUserResponseDTO[]> {
        const users = await UserModel.find({}, { passwordHash: 0 });

        return users;
    }
}
