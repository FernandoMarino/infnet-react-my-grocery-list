import type { Categoria } from "./Categoria";

export interface Item {
    id: string
    nome: string,
    marca?: string,
    tamanho?: string,
    categoria?: Categoria,
}