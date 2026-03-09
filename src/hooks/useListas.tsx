import { useState, useEffect } from "react"
import { getListas, saveListas } from "../services/listasCRUD"
import type { ListaWithId } from "../types/Lista"
import type { Item } from "../types/Item"

export function useListas() {
  // Inicializa estado sem useEffect
  const [listas, setListas] = useState<ListaWithId[]>(() => getListas())

  // Salva sempre que listas mudar
  useEffect(() => {
    saveListas(listas)
  }, [listas])

  function addItem(listaId: string, nome: string, qtd: number) {
    const novoItem: Item = {
      id: Date.now().toString(),
      nome,
      qtd
    }

    setListas(prev =>
      prev.map(lista =>
        lista.id === listaId
          ? { ...lista, items: [...lista.items, novoItem] }
          : lista
      )
    )
  }

  function deleteItem(listaId: string, itemId: string) {
  setListas((prev) =>
    prev.map((lista) =>
      lista.id === listaId
        ? {
            ...lista,
            items: lista.items.filter((item) => item.id !== itemId),
          }
        : lista
    )
  );
}


  
  

  function addLista(lista: ListaWithId) {
    setListas(prev => [...prev, lista])
  }

  function deleteLista(id: string) {
    setListas(prev => prev.filter(lista => lista.id !== id))
  }

  return {
    listas,
    addItem,
    addLista,
    deleteLista,
    deleteItem
  }
}