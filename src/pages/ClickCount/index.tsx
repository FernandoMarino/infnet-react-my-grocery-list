import { useState } from "react";
import { LinkButton, LinkButtonGroup } from "../../styles/layout/layout";
import { ClickCountCard, CounterP } from "../../styles/pages/ClickCount/clickCount";

function ClickCount() {

    
    const [count, setCount] = useState(0);

    return ( 
        <ClickCountCard>
          <LinkButtonGroup>
            <LinkButton onClick={() => setCount((count) => count + 1)}>
              Clique aqui
            </LinkButton>
            <LinkButton onClick={() => setCount(0)}>Reset</LinkButton>
          </LinkButtonGroup>
          <div>
            <CounterP>Cliques: {count}</CounterP>
          </div>
      </ClickCountCard>
     );
}

export default ClickCount;
