import { Button } from "reactstrap";
import { Link } from "react-router";
import { HomeContainer, HomeTitle, HomeNavButtonGroup, HomeSection } from "../../styles/pages/Home/home";

export default function Home() {
  return (
    <HomeContainer>
      <HomeTitle>Bem‑vindo ao MyGroceryApp!</HomeTitle>

      <HomeSection>
        Organize suas listas de compras de forma simples, rápida e prática. Aqui você pode criar
        novas listas, escolher a loja onde vai comprar e manter tudo sempre atualizado.
      </HomeSection>

      <HomeSection>
        <h3>
        Como usar            
        </h3>
        <ul>
          <li>Acesse Listas para visualizar todas as listas já criadas</li>
          <li>Clique em Nova Lista para começar uma nova</li>
          <li>Edite, consulte detalhes e mantenha suas compras sempre organizadas</li>
        </ul>
        Seu dia a dia fica mais leve quando suas listas trabalham por você
      </HomeSection>

      <HomeNavButtonGroup>
        <Button tag={Link} to={"/listas"}>
          Minhas Listas
        </Button>
      </HomeNavButtonGroup>
    </HomeContainer>
  );
}
