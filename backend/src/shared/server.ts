import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";

import appRouter from "./http/routes.js";
import { AppError } from "./errors/AppError.js";
import z, { ZodError } from "zod";
import { connectDB } from "./config/mongo_database.js";

const PORT: number = 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

app.use("/api", appRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
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

export default app
