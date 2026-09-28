import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/IController.js";
import { AuthenticateUserService } from "../services/AuthenticateUserService.js";
import { AuthenticateUserDTO } from "../dtos/AuthenticateUserDTO.js";

export class AuthenticateUserController implements IController {
    constructor(
        private readonly authenticateUserService: AuthenticateUserService,
    ) {}

    handle = async (req: Request, res: Response): Promise<Response> => {
        const payload: AuthenticateUserDTO = req.body;

        const { userId, token } =
            await this.authenticateUserService.execute(payload);

            console.log(userId);
            
        return res.status(200).json({
            message: "Login successful",
            userId,
            token,
        });
    };
}
