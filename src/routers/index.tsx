import { BrowserRouter, Route, Routes } from "react-router";


import Layout from "../components/Layout";
import Home from "../pages/Home";
import ClickCount from "../pages/ClickCount";

export function Routers() {
    return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>

                <Route path="/" element={<Home />} />            
                <Route path="/clickcount" element={<ClickCount />} />            
            </Route>
        </Routes>
    </BrowserRouter>)
}