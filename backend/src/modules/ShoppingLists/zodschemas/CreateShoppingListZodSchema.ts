import { z } from "zod";

const CreateShoppingListZodSchema = z.object({
    title: z.string().min(1, "Name must have at least 1 letter"),    
});

export default CreateShoppingListZodSchema;
