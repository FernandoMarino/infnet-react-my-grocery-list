import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import appRouter from "../../http/routes.js";
import { AppError } from "../../errors/AppError.js";
import z, { ZodError } from "zod";

const app = express();

app.use(express.json());
app.use(cors());

// Registra as rotas sob o prefixo /api idêntico ao server.ts
app.use("/api", appRouter);

// Middleware global de tratamento de erros idêntico ao server.ts
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return res
            .status(error.statusCode)
            .json({ status: "application_error", message: error.message });
    } else if (error instanceof ZodError) {
        return res.status(400).json({
            status: "validation_error",
            errors: z.treeifyError(error),
        });
    } else {
        return res
            .status(500)
            .json({ status: "error", message: "Internal Server Error" });
    }
});

export { app };
