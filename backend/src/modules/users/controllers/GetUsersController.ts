import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/IController.js";
import { GetUsersService } from "../services/GetUsersService.js";

export class GetUsersController implements IController {
    constructor(private readonly getUsersService: GetUsersService) {}

    handle = async (req: Request, res: Response): Promise<Response> => {
        const users = await this.getUsersService.execute();

        return res.status(200).json({
            users,
        });
    }
}
