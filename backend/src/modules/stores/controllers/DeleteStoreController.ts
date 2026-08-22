import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/IController";
import { StoreService } from "../services/StoreService";
import { DeleteStoreDTO } from "../dtos/DeleteStoreDTO";
import { AppError } from "../../../shared/errors/AppError";

export class DeleteStoreController implements IController {
    constructor(private readonly storeService: StoreService) {}

    handle = async (req: Request, res: Response): Promise<Response> =>  {
        const storeId: string = req.params['id'] as string;
        if(!storeId) throw new AppError("StoreId not provided", 400)

        const payload : DeleteStoreDTO = {
            storeId,
            userId: req.user.id
        };

        await this.storeService.deleteStoreService(payload)

        return res.status(200).json({
            message: "Store deleted successfully"
        })
        
    }
}