import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/IController";
import {
    UpdateOrDeleteItemDTO,
    ChangeItemCheckedService,
} from "../services/itemsServices/ChangeItemCheckedService";
import { AppError } from "../../../shared/errors/AppError";

export class ChangeItemCheckedController implements IController {
    constructor(private readonly service: ChangeItemCheckedService) {}

    handle = async (req: Request, res: Response): Promise<Response> => {
        const { listId, itemId } = req.params;

        if (typeof listId !== "string" || typeof itemId !== "string") {
            throw new AppError("Internal Server Error", 400);
        }

        const data: UpdateOrDeleteItemDTO = {
            userId: req.user.id,
            listId: listId,
            itemId: itemId,
        };

        const updatedList = await this.service.execute(data);

        return res.status(201).json({
            message: `${updatedList?.name} ${updatedList?.checked ? "checked" : "unchecked"} successfully`,
            updatedList,
        });
    };
}
