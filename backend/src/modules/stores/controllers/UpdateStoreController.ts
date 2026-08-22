import { Request, Response } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { IController } from "../../../shared/interfaces/IController";
import { UpdateStoreDTO } from "../dtos/UpdateStoreDTO";
import { StoreService } from "../services/StoreService";

export class UpdateStoreController implements IController {
    constructor(private readonly storeService: StoreService) {}

    handle = async (req: Request, res: Response): Promise<Response> => {
        const storeId: string = req.params["id"] as string;
        if (!storeId) throw new AppError("StoreId not provided", 400);

        const payload: UpdateStoreDTO = {
            storeId,
            userId: req.user.id,
            ...req.body
        };

        const updatedStore = await this.storeService.updateStore(payload);

        return res.status(200).json({
            message: "Store updated successfully",
            store: updatedStore
        });
    };
}
