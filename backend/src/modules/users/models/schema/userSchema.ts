import { Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

const userSchema = new Schema<IUser>(
    {
        name: { type: String, require: true },
        email: { type: String, require: true },
        passwordHash: { type: String, require: true },
        role: { type: String, require: true },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    },
);

userSchema.index(
    { email: 1 },
    { unique: true, partialFilterExpression: { deletedAt: null } },
);

export default userSchema;
