import { BrowserRouter, Route, Routes } from "react-router";

import ClickCounter from "../pages/ClickCounter";
import Layout from "../components/Layout";

export function Routers() {
    return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>

                <Route path="/" element={<ClickCounter />} />            
            </Route>
        </Routes>
    </BrowserRouter>)
}