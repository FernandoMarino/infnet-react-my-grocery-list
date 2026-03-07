import { BrowserRouter, Route, Routes } from "react-router";

import Home from "../pages/Home";
import Layout from "../components/Layout";

export function Routers() {
    return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>

                <Route path="/" element={<Home />} />            
            </Route>
        </Routes>
    </BrowserRouter>)
}