
import type { NovaListaFormData, NovaListaFormErros } from "../types/NovaListaFormData";

export const validateNovaListaForm = (formData: NovaListaFormData) => {
  const errors: NovaListaFormErros = {};

  if (!formData.nomeLista) errors.nomeLista = "Nome da Lista obrigatório";
  

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};