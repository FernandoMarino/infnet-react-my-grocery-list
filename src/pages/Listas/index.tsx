import { AccordionBody, AccordionHeader, AccordionItem, Button } from "reactstrap";
import { Link } from "react-router";
import {
  ListasAccordion,
  ListasButtonGroup,
  ListasContainer,
} from "../../styles/pages/Listas/listas";
import { useState } from "react";
import { useListas } from "../../hooks/useListas";
import NovoItemForm from "./NovoItemForm";
import type { ListaWithId } from "../../types/Lista";
import ItemList from "./ItemList";

export default function Listas() {
  const [open, setOpen] = useState<string>("");
  const { listas, addItem, deleteItem } = useListas();

  const toggle = (id: string) => {
    setOpen(open === id ? "" : id);
  };

  return (
    <ListasContainer>
      <ListasButtonGroup>
        <Button tag={Link} to={"/listas/nova"}>
          Nova Lista
        </Button>
      </ListasButtonGroup>
      {listas && (
        <ListasAccordion open={open} toggle={toggle}>
          {listas.map((lista: ListaWithId) => {
            if (lista.items) {
              return (
                <AccordionItem key={lista.id}>
                  <AccordionHeader targetId={lista.id}>{lista.name}</AccordionHeader>

                  <AccordionBody accordionId={lista.id}>
                    <NovoItemForm listaId={lista.id} onAdd={addItem} />
                    <ItemList listaId={lista.id} items={lista.items} onDelete={deleteItem} />
                  </AccordionBody>
                </AccordionItem>
              );
            }
          })}
        </ListasAccordion>
      )}
    </ListasContainer>
  );
}
