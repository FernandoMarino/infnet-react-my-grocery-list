import { Document } from "mongoose";

export interface Item extends Document{
    name: string;
    categories: string[];
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}