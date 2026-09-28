import { z } from "zod";
import { UNITS_OF_MEASURE } from "../dtos/IShoppingItemDTO";

const InsertShoppingItemZodSchema = z.object({
    name: z.string().min(1, ""),
    quantity: z.number().positive().optional(),
    unitOfMeasure: z.enum(UNITS_OF_MEASURE).optional(),
    checked: z.boolean().optional(),
});

export default InsertShoppingItemZodSchema;
