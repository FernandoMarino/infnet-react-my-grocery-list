import { Schema, Types } from "mongoose";
import { ShoppingItemSchema } from "./ShoppingItemSchema";
import { IShoppingList } from "../../interfaces/IShoppingList";
import { IShoppingItem } from "../../interfaces/IShoppingItem";

export const ShoppingListSchema = new Schema<IShoppingList>(
    {
        userId: { type: Types.ObjectId, required: true, index: true },
        title: { type: String, required: true },
        items: { 
            type: [ShoppingItemSchema], 
            default: [],
            validate: {
                validator: function (items: IShoppingItem[]) {
                    const normalizedNames = items.map((item) => item.name.trim().toLowerCase())
                    return new Set(normalizedNames).size === normalizedNames.length
                }

            }
        },
    },
    { timestamps: true },
);





