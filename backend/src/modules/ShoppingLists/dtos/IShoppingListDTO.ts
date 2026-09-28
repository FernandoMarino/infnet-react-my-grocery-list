import { Types } from "mongoose";
import { IShoppingItemDTO } from "./IShoppingItemDTO";

export interface IShoppingListDTO {
    _id?: string | Types.ObjectId;
    userId: string;
    title: string;
    items?: IShoppingItemDTO[];
}