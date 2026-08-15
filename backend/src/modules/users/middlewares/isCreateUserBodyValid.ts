import CreateUserSchema from "../schemas/CreateUserSchema.js";
import { NextFunction, Request, Response } from "express";

export async function isCreateUserBodyValid(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    await CreateUserSchema.parseAsync(req.body);
    next();
}
