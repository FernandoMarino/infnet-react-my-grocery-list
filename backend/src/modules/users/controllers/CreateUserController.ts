import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/IController.js";
import { ICreateUserDTO } from "../dtos/CreateUserDTO.js";
import { CreateUserService } from "../services/CreateUserService.js";

export class CreateUserController implements IController {
    constructor(private readonly createUserService: CreateUserService) {}

    handle = async (req: Request, res: Response): Promise<Response> => {
        const createUserPayload: ICreateUserDTO = req.body;
        const user = await this.createUserService.execute(createUserPayload);

        return res.status(201).json({
            message: "User Created Successfully",
            user,
        });
    }
}
