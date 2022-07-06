import styled from 'styled-components'
import {NavLink as Link} from 'react-router-dom'
import {FaBars} from 'react-icons/fa'

export const Nav = styled.nav`
    background: #2A4858;
    height: 100px;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem calc((100vw - 1000px) / 2);
    z-index: 10;
    font-size: 24px;
    font-family: 'Nunito Sans', sans-serif;
    font-weight: bold;

`

export const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    &.active {
        color: #ff9c00;
    }
    &:hover {
        cursor: loading;
        color: #ff9c00;
        transition: 150ms ease-in;
    }
`

export const Bars = styled(FaBars)`
display: none;
color: #fff;

@media screen and (max-width: 768px){
    display: block;
    position: absoulte;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
}
`

export const NavMenu = styled.div`
    display: flex; 
    align: center;
    margin-right: -24px;

    @media screen and (max-width: 768px){
        display: none;
    }
`

export const NavButton = styled.nav`
    display: flex;
    color: #fff;
    align-items: center;
    margin-right: 24px;
    @media screen and (max-width: 768px){
        display: none;
    }

    &:hover {
        cursor: loading;
        color: #ff9c00;
        transition: 150ms ease-in;
    }
`

export const NavButtonLink = styled(Link)`
    border-radius: 4px;
    background: #256ce1;
    padding: 10px 22px;
    color: #fff;
    border: none;
    outline: none:
    text-decoration: none;
`