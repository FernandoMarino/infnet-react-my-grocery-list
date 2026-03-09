import type { Item } from "./Item"
import type { Loja } from "./Loja"

export interface Lista {
    name: string,
    loja?: Loja | undefined
    items: Item[]
}

export interface ListaWithId extends Lista {
    id: string;
}
