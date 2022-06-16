import React from 'react'
import {
    Navbar,
    Nav,
    NavItem,
    NavbarBrand,
    Container
} from 'reactstrap'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
export const OptionsHeading = () => {
  return (
    <Navbar color="dark" dark>
        <Container className='d-flex'>
            <NavbarBrand>
                Option Tiles
            </NavbarBrand>
            <Nav className = "ms-auto">
                <NavItem>
                    <Link className="btn btn-primary" to ="/add-options-tile">Add Options Tile</Link>
                </NavItem>
            </Nav>
        </Container>
    </Navbar>
  )
}
