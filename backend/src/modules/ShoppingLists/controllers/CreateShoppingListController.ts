import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/IController";
import { CreateShoppingListService } from "../services/listsServices/CreateShoppingListService";
import { CreateShoppingListDTO } from "../dtos/CreateShoppingListDTO";

export class CreateShoppingListController implements IController {
    constructor(private readonly service: CreateShoppingListService) {}

    handle = async (req: Request, res: Response): Promise<Response> => {
        const data: CreateShoppingListDTO = {
            userId: req.user.id,
            title: req.body.title,
        };
        console.log(data.title, req.body.title);
        
        const newList = await this.service.execute(data);

        return res.status(201).json({
            message: `${newList.title} successfully created`,
            newList,
        });
    };
}
