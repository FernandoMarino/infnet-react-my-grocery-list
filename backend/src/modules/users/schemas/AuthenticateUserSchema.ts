import { z } from "zod";

const AuthenticateUserSchema = z
    .object({
        email: z.email("Invalid email format"),
        password: z
            .string()
            .min(6, "Passwords must have at least 6 characters")
        
    })

    export default AuthenticateUserSchema;