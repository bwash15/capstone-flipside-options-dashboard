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
            <img src="Images/FlipSideLogo.png" alt="Logo"/>
            </NavLink>

            <Bars />
            <NavMenu>
                <NavLink to='/tiles' activeStyle>
                    Tiles
                </NavLink>
                <NavLink to='/trading' activeStyle>
                    Trading
                </NavLink>
                <NavLink to='/profile' activeStyle>
                    Profile
                </NavLink>
            </NavMenu>
            <button onClick={logout}>Logout</button>
        </Nav>
    </>
  )
}
export default NavBar;