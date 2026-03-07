import { useNavigate } from "react-router";
import { useLojas } from "../../../hooks/useLojas";
import { type NovaListaFormErros, type NovaListaFormData } from "../../../types/NovaListaFormData";
import NovaListaForm from "./NovaListaForm";
import { useCallback, useState, type ChangeEvent } from "react";
import { validateNovaListaForm } from "../../../utils/validateNovaListaForm";

interface NovaListProps {
  setShowForm: (value: boolean) => void;
}

const INITIAL_FORM: NovaListaFormData = {
    nomeLista: "",
    nomeLoja: "",
}

function NovaLista({setShowForm}: NovaListProps){
    const navigate = useNavigate();
    const {lojas,isLoading} = useLojas();
    const [formData, setFormData] = useState<NovaListaFormData>(INITIAL_FORM);
    const [erros, setErros] = useState<NovaListaFormErros>({})

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const {name, value} = e.target;

            setFormData(prev => ({...prev, [name]:value}));
            const key = name as keyof NovaListaFormErros
      if (erros[key]) {
        setErros((prev) => ({ ...prev, [name]: "" }));
      }
    }
    ,[erros])


    const handleCreate = useCallback(() => {
      
      const validation = validateNovaListaForm(formData);

      if (validation.isValid) {
        // saveLista(formData);
        console.log(formData);        
        setShowForm(false);
        navigate("/");
      } else {
        setErros(validation.errors);
      }
    },
    [
      formData, 
      navigate, 
      setErros,
      setShowForm      
    ],
  );


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