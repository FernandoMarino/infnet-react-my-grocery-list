import { AppError } from "../../../../shared/errors/AppError";
import { IShoppingListDTO } from "../../dtos/IShoppingListDTO";
import { IShoppingListRepository } from "../../repositories/IShoppingListRepository";

export class GetAllShoppingListsService {
    constructor(
        private readonly shoppingListRepository: IShoppingListRepository,
    ) {}

    async execute(userId: string): Promise<IShoppingListDTO[]> {
        console.log("service");
        const lists = await this.shoppingListRepository.getLists(userId);

        console.log("lists:",lists);

        if (lists.length === 0)
            throw new AppError("User has no lists created", 404);
        return lists;
    }
}
