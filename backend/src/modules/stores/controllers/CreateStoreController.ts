import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/IController";
import { CreateStoreDTO } from "../dtos/CreateStoreDTO";
import { StoreService } from "../services/StoreService";

export class CreateStoreController implements IController {
    constructor(private readonly storeService: StoreService) {}

    // handle
    handle = async (req: Request, res: Response): Promise<Response> => {
        const createStorePayload: CreateStoreDTO = req.body;

        const userId = req.user.id;

        const store = await this.storeService.createStore(
            createStorePayload,
            userId,
        );

        return res.status(201).json({
            message: "Store Created Successfully",
            store,
        });
    };
}
