import { useNavigate } from "react-router";
import { useLojas } from "../../../hooks/useLojas";
import { type NovaListaFormErros, type NovaListaFormData } from "../../../types/NovaListaFormData";
import NovaListaForm from "./NovaListaForm";
import { useCallback, useState, type ChangeEvent } from "react";
import { validateNovaListaForm } from "../../../utils/validateNovaListaForm";


const INITIAL_FORM: NovaListaFormData = {
    nomeLista: "",
    nomeLoja: "",
}

function NovaLista(){
    const navigate = useNavigate();
    const {lojas,isLoading} = useLojas();

    const [formData, setFormData] = useState(INITIAL_FORM);
    const [erros, setErros] = useState<NovaListaFormErros>({});

    const handleChange = useCallback(
      // Função a ser memoizada
      (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      
      const {name, value} = e.target;
      
      const fieldName = name as keyof NovaListaFormData

      setFormData(prev => ({ ...prev, [fieldName]: value}));

      if (erros[fieldName]) {
        setErros(prev => ({...prev, [fieldName]: ""}));
      }
    },
    // Lista de Dependências
    [erros]
  );

  const handleCreate = useCallback(
    // Função a ser memoizada
    () => {
      const formValidation = validateNovaListaForm(formData);

      if (formValidation.isValid){
        // salva list
        navigate("/listas");
      }
      else {
        setErros(formValidation.errors)
      }

    },
    // Dependências
    [
      formData,
      navigate
    ]
  )
    return ( 
        <NovaListaForm 
            onCreate={handleCreate} 
            onChange={handleChange}
            formData={formData}
            formErros={erros}
            lojas={lojas} 
            isLoadingLojas={isLoading} 
            resetForm={() => setFormData(INITIAL_FORM)}
        /> );
}

export default NovaLista;