import { IShoppingListDTO } from "./IShoppingListDTO";

export type CreateShoppingListDTO = Pick<IShoppingListDTO, "userId" | "title">;