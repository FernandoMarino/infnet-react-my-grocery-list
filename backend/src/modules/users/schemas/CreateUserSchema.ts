import { z } from "zod";

const CreateUserSchema = z.object({
    name: z.string().min(2, "Name must have at least 2 letters"),
    email: z.email("Invalid email format"),
    password: z.string().min(6, "Passwords must have at least 6 characters"),
    role: z.string().min(1,"Role é Obrigatório"),
});

export default CreateUserSchema;
