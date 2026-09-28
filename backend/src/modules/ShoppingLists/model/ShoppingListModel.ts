import mongoose from "mongoose";
import { ShoppingListSchema } from "./schemas/ShoppingListSchema";


export const ShoppingListModel = mongoose.model(
    "ShoppingLists",
    ShoppingListSchema,
);
