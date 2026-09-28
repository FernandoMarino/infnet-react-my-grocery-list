import { BcryptHashProvider } from "../providers/BcryptHashProvider";
import { UserRepositoryMongoDB } from "../repositories/UserRepositoryMongoDB";

export const userRepository = new UserRepositoryMongoDB();
export const hashProvider = new BcryptHashProvider();