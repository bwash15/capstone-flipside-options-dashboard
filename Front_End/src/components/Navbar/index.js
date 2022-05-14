import React from 'react'
import { FaCookie } from 'react-icons/fa';
import ReactDOM from 'react-router-dom' 
import axios from '../../api/axios';
import {Nav, NavLink, Bars, NavMenu, NavButton, NavButtonLink} from './NavBarElements'   
const NavBar = () => {
  
    const logout = async ()=> {
        this.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
        window.location.href = '/';
    };
  
  
    return (
    <>
        <Nav>
            <NavLink to="/">
            <img style = {{height: '60px', width: '120px'}} src="Images/FlipSideLogo.png" alt="Logo"/>
            </NavLink>

            <Bars />
            <NavMenu>
                <NavLink to='/home' activestyle = "true">
                    Home
                </NavLink>
                <NavLink to='/tiles' activestyle = "true">
                    Tiles
                </NavLink>
                <NavLink to='/trading' activestyle = "true">
                    Trading
                </NavLink>
                <NavLink to='/profile' activestyle = "true">
                    Profile
                </NavLink>
            </NavMenu>
            <NavButton onClick={logout} style={{cursor:"pointer"}}>
                Logout
            </NavButton>
        </Nav>
    </>
  )
}
export default NavBar;