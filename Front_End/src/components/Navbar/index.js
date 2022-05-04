import React from 'react'
import ReactDOM from 'react-router-dom' 
import {Nav, NavLink, Bars, NavMenu, NavButton, NavButtonLink} from './NavBarElements'   
const NavBar = () => {
  
    const logout =()=> {
        localStorage.clear();
        window.location.href = '/';
    };
  
  
    return (
    <>
        <Nav>
            <NavLink to="/">
            <h1>Logo</h1>
            </NavLink>

            <Bars />
            <NavMenu>
                <NavLink to='/Tiles' activeStyle>
                    Tiles
                </NavLink>
                <NavLink to='/Trading' activeStyle>
                    Trading
                </NavLink>
                <NavLink to='/Profile' activeStyle>
                    Profile
                </NavLink>
            </NavMenu>
            <button onClick={logout}>Logout</button>
        </Nav>
    </>
  )
}
export default NavBar;