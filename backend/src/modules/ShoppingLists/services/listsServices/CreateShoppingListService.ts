
import { CreateShoppingListDTO } from "../../dtos/CreateShoppingListDTO";
import { IShoppingListRepository } from "../../repositories/IShoppingListRepository";

export class CreateShoppingListService {
    constructor(
        private readonly shoppingListRepository: IShoppingListRepository,
    ) {}

    async execute(data: CreateShoppingListDTO) {
        return await this.shoppingListRepository.createList(data);
    }
}
