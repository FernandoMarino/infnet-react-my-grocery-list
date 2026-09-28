import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/IController";
import { GetAllShoppingListsService } from "../services/itemsServices/GetAllShoppingListsService";

export class GetAllListsController implements IController {
    constructor(private readonly service: GetAllShoppingListsService) {}

    handle = async (req: Request, res: Response): Promise<Response> => {
        console.log("controller");

        const lists = await this.service.execute(req.user.id);

        if (!lists) return res.status(404);

        return res.status(200).json({
            lists,
        });
    };
}
