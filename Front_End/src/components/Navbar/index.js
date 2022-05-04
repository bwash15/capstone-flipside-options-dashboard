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
            <img style = {{height: '60px', width: '120px'}} src="Images/FlipSideLogo.png" alt="Logo"/>
            </NavLink>

            <Bars />
            <NavMenu>
                <NavLink to='/' activeStyle>
                    Home
                </NavLink>
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
            <NavButton onClick={logout} style={{cursor:"pointer"}}>
                Logout
            </NavButton>
        </Nav>
    </>
  )
}
export default NavBar;