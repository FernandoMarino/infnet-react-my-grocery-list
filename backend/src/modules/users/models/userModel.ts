import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";
import { userSchema } from "../schemas/userSchema";

export const UserModel = mongoose.model<IUser>('Users', userSchema);