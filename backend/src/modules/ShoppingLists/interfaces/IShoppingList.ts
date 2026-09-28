import { Types } from "mongoose";
import { IShoppingItem } from "./IShoppingItem";

export interface IShoppingList extends Document {
    userId: Types.ObjectId;
    title: string;
    items: IShoppingItem[];
    createdAt: Date;
    updatedAt: Date;
}
