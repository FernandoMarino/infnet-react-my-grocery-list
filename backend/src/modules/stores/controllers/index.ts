import { storesServices } from "../services";
import { CreateStoreController } from "./CreateStoreController";
import { DeleteStoreController } from "./DeleteStoreController";
import { FindStoresByUserController } from "./FindStoresByUserController";
import { UpdateStoreController } from "./UpdateStoreController";

export const createStoreController = new CreateStoreController(storesServices);
export const updateStoreController = new UpdateStoreController(storesServices);
export const deleteStoreController = new DeleteStoreController(storesServices);
export const findStoresByUserController = new FindStoresByUserController(storesServices);