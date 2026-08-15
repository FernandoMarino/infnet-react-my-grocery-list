import { Request, Response } from "express";
import { IController } from "./IController.js";

class CreateUserController implements IController {
    handle(req: Request, res: Response): Promise<Response> {

        

        const { name, email, password, googleUuid } = req.body;
    }
}
