import { SaveItemDTO } from "../dtos/SaveItemDTO";
import { Item } from "../entities/Item";

export abstract class IItemRepository {
    abstract saveItem(payload: SaveItemDTO): Promise<Item>
    abstract findItemById(itemId: string): Promise<Item | null>
    abstract findItemByName(userId: string, name: string): Promise<Item | null>    
    abstract findItemsByUser(userId: string): Promise<Item[]>    
    abstract removeItem(itemId: string): Promise<void>
    abstract updateItem(itemId: string, payload:SaveItemDTO): Promise<Item>
}