import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/IController";
import { DeleteShoppingItemService } from "../services/itemsServices/DeleteShoppingItemService";
import { UpdateOrDeleteItemDTO } from "../services/itemsServices/ChangeItemCheckedService";
import { AppError } from "../../../shared/errors/AppError";

export class DeleteShoppingItemController implements IController {
    constructor(
        private readonly deleteItemService: DeleteShoppingItemService,
    ) {}

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

        const updatedList = await this.deleteItemService.execute(data);

        if (!updatedList) {
            return res.status(404).json({
            message: "Item not found"
        });
        }

        return res.status(202).json({
            message: "Item deleted successfully",
            updateList: updatedList,
        });
    };
}
