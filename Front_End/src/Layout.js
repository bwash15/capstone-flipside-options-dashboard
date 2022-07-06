import { Outlet } from "react-router-dom";
import NavBar from './components/Navbar';
import React from 'react'
import { FooterContainer } from "./components/Footer/Containers/footer";
import "./outlet.css"

const Layout = () => {
    return (
        <main className="App">
            <NavBar />
            <div className="Outlet">
                <Outlet />
            </div>
            <FooterContainer />
        </main>
    )
}

export default Layout

