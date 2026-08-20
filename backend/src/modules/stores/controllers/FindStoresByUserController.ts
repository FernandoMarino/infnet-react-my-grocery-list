import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/IController";
import { StoreService } from "../services/StoreService.js";

export class FindStoresByUserController implements IController {
    
    constructor(private readonly storeService: StoreService) {}
    
    handle = async (req: Request, res: Response): Promise<Response> => {
            
        const stores = await this.storeService.findStoresByUser(req.user.id)

        return res.status(200).json({
            message: "Stores retrieved successfully",
            stores
        })
    }
}