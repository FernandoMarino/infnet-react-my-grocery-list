
import { Button } from "reactstrap";
import { HomeContainer, HomeNavButtonGroup, StyledSearchBar } from "../../styles/pages/Home/home";
import { useState } from "react";
import { FormContainer } from "../../styles/pages/Home/CreateListForm/CreateListForm";
import NovaLista from "./components/NovaList";

export default function Home(){  

    const [showForm, setShowForm] = useState<boolean>(false)
    

    return (
    <HomeContainer>
        <HomeNavButtonGroup>
            <Button onClick={() => setShowForm((prev) => !prev)}>Nova Lista</Button>
            <Button>Deletar</Button>
        </HomeNavButtonGroup>
        <StyledSearchBar type="search" placeholder="🔍 Digite sua busca" />

        {showForm && 
            <FormContainer>
                <NovaLista setShowForm={() => setShowForm(false)} />
            </FormContainer>
        }

    </HomeContainer>
    );
}