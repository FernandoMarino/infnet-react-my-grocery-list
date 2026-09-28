import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/IController";
import { InsertShoppingItemsService } from "../services/itemsServices/InsertShoppingItemsService";
import { InsertShoppingItemDTO } from "../dtos/InsertShoppingItemDTO";
import { AppError } from "../../../shared/errors/AppError";

export class InsertShoppingItemController implements IController {
    constructor(private readonly service: InsertShoppingItemsService) {}

    handle = async (req: Request, res: Response): Promise<Response> => {
        const data: InsertShoppingItemDTO = {
            userId: req.user.id,
            listId: req.params["listId"] as string,
            payload: req.body,
        };
        console.log(data);

        const newList = await this.service.execute(data);

        if (!newList) {
            throw new AppError("Item insertion has failed", 500);
        }

        return res.status(201).json({
            message: `${newList.title} successfully created`,
            newList,
        });
    };
}
