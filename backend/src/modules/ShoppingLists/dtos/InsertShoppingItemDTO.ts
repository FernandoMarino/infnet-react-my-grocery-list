import { IShoppingItemDTO } from "./IShoppingItemDTO";

export interface InsertShoppingItemDTO {
    userId: string;
    listId: string;
    payload: IShoppingItemDTO;
}