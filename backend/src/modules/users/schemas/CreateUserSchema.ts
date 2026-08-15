import { z } from "zod";

const createUserSchema = z
    .object({
        name: z.string().min(2, "Name must have at least 2 letters"),
        email: z.email("Invalid email format"),
        password: z
            .string()
            .min(6, "Passwords must have at least 6 characters")
            .optional(),
        googleUuid: z.string().uuid("Invalid google ID").optional(),
    })
    .refine(
        (data) => {
            return !!data.password || !!data.googleUuid;
        },
        {
            message: "Password is required if login is not via Google",
            path: ["password"],
        },
    );

    export default createUserSchema;