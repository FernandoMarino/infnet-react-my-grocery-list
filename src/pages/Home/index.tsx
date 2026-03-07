import { useState } from "react";
import { ThemedButton, ThemedButtonGroup, ThemedP } from "../../styles/layout/layout";


function Home() {

    
    const [count, setCount] = useState(0);

    return ( 
        <>        
          <ThemedButtonGroup>
            <ThemedButton onClick={() => setCount((count) => count + 1)}>
              Clique aqui
            </ThemedButton>
            <ThemedButton onClick={() => setCount(0)}>Reset</ThemedButton>
          </ThemedButtonGroup>
          <div>
            <ThemedP>Cliques: {count}</ThemedP>
          </div>
      </>
     );
}

export default Home;
