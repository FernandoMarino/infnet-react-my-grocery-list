import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/IController";
import { CreateShoppingListDTO } from "../dtos/CreateShoppingListDTO";
import { DeleteShoppingListService } from "../services/listsServices/DeleteShoppingListService";

export class DeleteShoppingListController implements IController {
    constructor(private readonly service: DeleteShoppingListService) {}

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
