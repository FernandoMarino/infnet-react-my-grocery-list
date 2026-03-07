import type { Item } from "./Item"
import type { Loja } from "./Loja"

export interface Lista {
    name: string,
    items?: Item[]
    loja?: Loja 
}

