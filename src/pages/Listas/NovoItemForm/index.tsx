import { useState } from "react";
import { NovoItemDiv, NovoItemInput } from "../../../styles/pages/Listas/listas";
import { Button } from "reactstrap";
import type { NovoItemFormProps } from "../../../types/NovoItemFormProps";

export default function NovoItemForm({ listaId, onAdd }: NovoItemFormProps) {
  const [nome, setNome] = useState("");
  const [qtd, setQtd] = useState("");

  return (
    <NovoItemDiv>
      <NovoItemInput
        type="text"
        placeholder="Descrição do item"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <NovoItemInput
        type="number"
        placeholder="Quantidade"
        value={qtd}
        onChange={(e) => setQtd(e.target.value)}
      />

      <Button onClick={() => {
            onAdd(listaId, nome, Number(qtd))
            }}>
        Adicionar
      </Button>
    </NovoItemDiv>
  );
}
