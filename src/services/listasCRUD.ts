import type { Item } from "../types/Item";
import type { ListaWithId } from "../types/Lista";
const STORAGE_KEY = "listas";

export const getListas = () => {
  const listasRaw = localStorage.getItem("listas");
  const listas: ListaWithId[] = listasRaw ? JSON.parse(listasRaw) : [];
  return listas;
};

export const saveLista = (novaLista: ListaWithId) => {
  const listasRaw = localStorage.getItem(STORAGE_KEY);
  const listasArray: ListaWithId[] = listasRaw ? JSON.parse(listasRaw) : [];
  listasArray.push(novaLista);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listasArray));
};

export const saveListas = (listas: ListaWithId[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listas));
};


export const editListas = () => {};

export const deleteListas = (lista: ListaWithId) => {
  const listasRaw = localStorage.getItem(STORAGE_KEY);
  const listasArray: ListaWithId[] = listasRaw ? JSON.parse(listasRaw) : [];
  const index = listasArray.findIndex((l) => l.id === lista.id);

  if (index !== -1) listasArray.splice(index, 1);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(listasArray));
};

export const addItem = (listaId: string, novoItem: Item) => {
  const listasRaw = localStorage.getItem(STORAGE_KEY);

  if (!listasRaw) return;

  const listas: ListaWithId[] = JSON.parse(listasRaw);
  const listasAtualizadas = listas.map((lista: ListaWithId) =>
    lista?.id === listaId ? { ...lista, items: [...lista.items, novoItem] } : lista,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(listasAtualizadas));
};


export const deleteItem = (listaId: string, itemId: string) => {
  const listas = getListas();

  const listasAtualizadas = listas.map((lista) =>
    lista.id === listaId
      ? {
          ...lista,
          items: lista.items.filter((item) => item.id !== itemId),
        }
      : lista
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(listasAtualizadas));
};
