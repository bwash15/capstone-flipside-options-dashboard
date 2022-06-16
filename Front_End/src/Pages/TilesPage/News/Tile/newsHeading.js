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
export const NewsHeading = () => {
  return (
    <Navbar color="dark" dark>
        <Container className='d-flex'>
            <NavbarBrand>
                News Tiles
            </NavbarBrand>
            <Nav className = "ms-auto">
                <NavItem>
                    <Link className="btn btn-primary" to ="/add-news-tile">Add News Tile</Link>
                </NavItem>
            </Nav>
        </Container>
    </Navbar>
  )
}
