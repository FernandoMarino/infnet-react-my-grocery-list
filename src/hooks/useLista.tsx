import type { NovaListaFormData } from "../types/NovaListaFormData";
import { useLoja } from "./useLojas";
import type { ListaWithId } from "../types/Lista";
import { getDate } from "../utils/getDate";
import { saveLista } from "../services/listasCRUD";

export const useLista = (formData: NovaListaFormData) => {
    const id = getDate();
    const nomeLoja = formData.nomeLoja ? formData.nomeLoja : ""
    const {lojaEncontrada, isLoading: isLoadingLoja} = useLoja(nomeLoja)


    const lista: ListaWithId = {
        id: id,
        name: formData.nomeLista,
        loja: lojaEncontrada,
        items: []
    }

    const salvarLista = () => {
        if (isLoadingLoja) return;
        saveLista(lista)        
    }

    return {lista, salvarLista, isLoadingLoja}

};
