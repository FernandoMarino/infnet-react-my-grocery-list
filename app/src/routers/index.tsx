import { BrowserRouter, Route, Routes } from "react-router";


import Layout from "../components/Layout";
import Home from "../pages/Home";
import ClickCount from "../pages/ClickCount";
import NovaLista from "../pages/Listas/NovaLista";
import Listas from "../pages/Listas";

export function Routers() {
    return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />            
                <Route path="/listas" element={<Listas />} />
                <Route path="/listas/nova" element={<NovaLista />} />
                <Route path="/listas/detail/:id" element={<h1>{"<DetalheLista />"}</h1>} />
                <Route path="/listas/detail/:id/editar" element={<h1>{"<EditarLista />"}</h1>} />
                {/* <Route path="*" element={<h1>Página não encontrada</h1>} /> */}
                <Route path="/clickcount" element={<ClickCount />} />            
            </Route>
        </Routes>
    </BrowserRouter>)
}