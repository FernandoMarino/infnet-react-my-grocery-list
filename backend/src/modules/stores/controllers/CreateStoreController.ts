import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/IController.js";
import { CreateStoreService } from "../services/CreateStoreService.js";
import { CreateStoreDTO } from "../dtos/CreateStoreDTO.js";

export class CreateStoreController implements IController {
    constructor(private readonly createStoreService: CreateStoreService) {}

    // handle
    handle = async (req: Request, res: Response): Promise<Response> => {
        const createStorePayload: CreateStoreDTO = req.body;

        const userId = req.user.id

        const store = await this.createStoreService.execute(createStorePayload, userId);

        return res.status(201).json({
            message: "Store Created Successfully",
            store,
        });
    };
}
