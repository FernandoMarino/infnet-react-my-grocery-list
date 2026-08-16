import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { authConfig } from "../config/authConfig.js";

export async function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    const authHeaders = req.headers.authorization;

    if (!authHeaders?.includes("Bearer ")) {
        throw new AppError("User not authenticated", 401);
    }
    const token = authHeaders.split(" ")[1];

    if (!token) {
        throw new AppError("Token not present", 401);
    }

    try {
        const decoded = jwt.verify(token, authConfig.jwt.secret);

        if (!decoded) {
            throw new AppError("Invalid or Expired token", 401);
        }

        const { sub: userId } = decoded as JwtPayload;

        if (!userId) {
            throw new AppError("Invalid or Expired token", 401);
        }

        req.user = {
            id: userId,
        };

        next();
    } catch (error) {
        console.error(error);

        if (error instanceof JsonWebTokenError) {
            throw new AppError("Invalid or Expired Token", 401);
        } else {
            throw new AppError("Internal Server Error", 500);
        }
    }
}
