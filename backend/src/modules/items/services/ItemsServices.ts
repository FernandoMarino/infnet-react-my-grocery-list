import { IItemRepository } from "../repositories/IItemRepository";

class ItemsServices {
    constructor(private readonly itemsRepository: IItemRepository) {}

    createItem() {}
    findItemById() {}
    findItemByName() {}
    findItemsByUser() {}


}