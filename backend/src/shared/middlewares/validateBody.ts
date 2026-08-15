import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export function validateBody(schema: ZodType) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await schema.parseAsync(req.body);
        next()
    }
}