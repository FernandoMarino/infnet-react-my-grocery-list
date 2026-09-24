import { Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

export const userSchema = new Schema<IUser>({
    name: { type: String, require: true },
    email: { type: String, require: true },
    passwordHash: { type: String, require: true },
    role: { type: String, require: true },
});
