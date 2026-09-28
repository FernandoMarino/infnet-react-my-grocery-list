import { Schema } from "mongoose";
import { UNITS_OF_MEASURE } from "../../dtos/IShoppingItemDTO";
import { IShoppingItem } from "../../interfaces/IShoppingItem";

export const ShoppingItemSchema = new Schema<IShoppingItem>(
    {
        name: { type: String, required: true, trim: true },
        quantity: { type: Number, required: false },
        unitOfMeasure: {
            type: String,
            enum: UNITS_OF_MEASURE,
            required: false,
        },
        checked: { type: Boolean, required: true, default: false },
    },
    {
        _id: true,
    },
);
