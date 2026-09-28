import { IShoppingListRepository } from "../../repositories/IShoppingListRepository";

export class GetAllShoppingListsService {
    constructor(
        private readonly shoppingListRepository: IShoppingListRepository,
    ) {}

    async execute(userId: string) {
        return await this.shoppingListRepository.getLists(userId);
    }
}


