import Layout from "../Laouts";
import { BrowserRouter, Route, Routes } from "react-router";
import '../sass/main.scss'

export default function Router () {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    
                </Route>
            </Routes>
        </BrowserRouter>
    </>
    
}