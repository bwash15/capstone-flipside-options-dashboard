import React from 'react'
import ReactDOM from 'react-router-dom'
import { Nav, NavLink, Bars, NavMenu, NavButton, NavButtonLink } from './NavBarElements'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUpRightAndDownLeftFromCenter} from '@fortawesome/free-solid-svg-icons'
import "./styles.css"
const NavBar = () => {

    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    };


    return (
        <>
            <Nav>
                <NavLink to="/">
                <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} size="3x" color="#fff"/>
                </NavLink>

                <Bars />
                <NavMenu>
                    <NavLink to='/' activestyle="true">
                        Home
                    </NavLink>
                    <NavLink to='/tiles' activestyle="true">
                        Tiles
                    </NavLink>
                    <NavLink to='/analytics' activestyle="true">
                        Analytics
                    </NavLink>
                    <NavLink to='/profilePage' activestyle="true">
                        Profile
                    </NavLink>
                </NavMenu>
                <NavButton onClick={logout} style={{ cursor: "pointer" }}>
                    Logout
                </NavButton>
            </Nav>
        </>
    )
}
export default NavBar;