
import { Accordion, AccordionHeader, AccordionItem, Button } from "reactstrap";
import { Link } from "react-router";
import { ListasButtonGroup, ListasContainer } from "../../styles/pages/Listas/listas";
import { useState } from "react";

const listas = [
    {
        id: "lista-001",
        name: "Lista da Semana",
        items: ["arroz","feijao", 'leite', 'ovos', 'nescau']
    },
    {
        id: "lista-002",
        name: "Lista da Semana",
        items: ["massa","agua", 'chocolate']
    },
]

export default function Listas(){  

    const [open, setOpen] = useState('1');
    const toggle = (id: string) => {
        if(open !== id) {
            setOpen(id);
        }
    }    

    return (
    <ListasContainer>
        <ListasButtonGroup>
            <Button tag={Link} to={"/listas/nova"}>Nova Lista</Button>
            <Button>Deletar</Button>
        </ListasButtonGroup>


        <Accordion open={open} toggle={toggle}>
            {listas.map((lista, i) => {
                return (
            <AccordionItem>
                <AccordionHeader targetId={i}>{lista.name}</AccordionHeader>
            </AccordionItem>)
            
        })}
        </Accordion>


    </ListasContainer>
    );
}