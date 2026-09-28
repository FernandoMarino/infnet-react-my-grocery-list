import { CreateShoppingListDTO } from "../dtos/CreateShoppingListDTO";
import { IShoppingItemDTO } from "../dtos/IShoppingItemDTO";
import { IShoppingListDTO } from "../dtos/IShoppingListDTO";

export abstract class IShoppingListRepository {
    abstract createList(data: CreateShoppingListDTO): Promise<IShoppingListDTO>;
    abstract getLists(userId: string): Promise<IShoppingListDTO[]>
    abstract getListById(listId: string): Promise<IShoppingListDTO | null>
    abstract deleteList(listId: string): Promise<IShoppingListDTO | null>

    abstract insertItem(listId: string, itemData: IShoppingItemDTO): Promise<IShoppingListDTO | null>
    abstract updateItem(
        listId: string, 
        itemId: string, 
        item: Partial<IShoppingItemDTO>
    ): Promise<IShoppingItemDTO | null>
    abstract getItems(listId: string ): Promise<IShoppingItemDTO[]>
    abstract removeItem(listId: string, itemId: string ): Promise<IShoppingListDTO | null>
}