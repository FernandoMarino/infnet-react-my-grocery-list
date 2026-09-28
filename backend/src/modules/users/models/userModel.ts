import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";
import userSchema from "./schema/userSchema";

export const UserModel = mongoose.model<IUser>('Users', userSchema);