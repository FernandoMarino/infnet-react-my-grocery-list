import { BiStore } from "react-icons/bi";
import { TfiWrite } from "react-icons/tfi";
import { Button, FormFeedback, FormGroup, Input, InputGroupText, Label } from "reactstrap";
import type { NovaListaFormData, NovaListaFormErros } from "../../../../types/NovaListaFormData";
import type { Loja } from "../../../../types/Loja";
import type { ChangeEvent } from "react";
import { NovaListaFormContainer, NovaListaFormTextInput, NovaListaInputGroup } from "../../../../styles/pages/Listas/CreateListForm";

interface NovaListaFormProps {
    formData: NovaListaFormData
    onCreate: () => void
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    formErros: NovaListaFormErros
    lojas: Loja[]
    resetForm?:() => void
    isLoadingLojas: boolean
}



export default function NovaListaForm({
    formData,
    onCreate,
    onChange,
    lojas,
    formErros,
    // resetForm,      
    isLoadingLojas
    
    }:NovaListaFormProps){

    

    return ( 
        <NovaListaFormContainer onSubmit={(e:SubmitEvent) => {
                e.preventDefault();
                onCreate();
            }
        }>
            <h3>Criar Lista</h3>
            <FormGroup>
                <Label for="nomeLista">Nome da Lista</Label>
                <NovaListaInputGroup>
                    <InputGroupText >
                        <TfiWrite />
                    </InputGroupText>
                    <NovaListaFormTextInput 
                        placeholder="Digite um nome para a lista" 
                        name="nomeLista" 
                        value={formData.nomeLista} 
                        onChange={onChange}
                        invalid={!!formErros.nomeLista}/>
                    <FormFeedback>{formErros.nomeLista}</FormFeedback>
                </NovaListaInputGroup>
            </FormGroup>
            
            <FormGroup>

                <NovaListaInputGroup>
                    <InputGroupText>
                        <BiStore />
                    </InputGroupText>
                    <Input 
                        type="select" 
                        id="loja" 
                        placeholder="Selecione uma loja" 
                        name="nomeLoja" 
                        value={formData.nomeLoja}
                        onChange={onChange}>
                        {isLoadingLojas ? 
                        
                        (<option value="" disabled>Carregando lojas...</option>)
                        :(
                            <option value="">Selecione a loja...</option>
                        )}

                            {lojas.map((loja) => (
                                <option key={loja.id} value={loja.nome}>
                                {loja.nome}
                            </option>
                            ))}

                        <option value="__nova__">Cadastrar nova loja</option>
                    </Input>
                    
                </NovaListaInputGroup>
            </FormGroup>
            <br/>
            <Button type="submit">Salvar Lista</Button>
        </NovaListaFormContainer>
        
     );
    }
    
    
    
    

