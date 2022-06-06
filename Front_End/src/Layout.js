import { Outlet } from "react-router-dom";
import NavBar from './components/Navbar';
import React from 'react'

const Layout = () => {
    return (
        <main className="App">
            <NavBar />
            <Outlet />
        </main>
    )
}

export default Layout

