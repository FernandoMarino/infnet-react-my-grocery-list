import { Document } from "mongoose";

export interface Category extends Document{
    name: string,
    userId: string,
    createdAt: Date,
    updatedAt: Date
}