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
export const Heading = () => {
  return (
    <Navbar color="dark" dark>
        <Container className='d-flex'>
            <NavbarBrand>
                Custom Tiles
            </NavbarBrand>
            <Nav className = "ms-auto">
                <NavItem>
                    <Link className="btn btn-primary" to ="/addTile">Add Tile</Link>
                </NavItem>
            </Nav>
        </Container>

    </Navbar>
  )
}
