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
export const OptionHeading = () => {

    const tileUUID = window.location.href.split("/")[4];
    console.log("The tile uuid for the option heading is " + tileUUID);
    const url = "/tiles/" + tileUUID + "/add"
    const backUrl = "/tiles/"
  return (
    <Navbar color="dark" dark>
        <Container className='d-flex'>
            <NavbarBrand>
                Options List
            </NavbarBrand>
            <Nav className = "ms-auto">
                <NavItem>
                    <Link className="btn btn-primary" to ={url}>Add Option</Link>
                </NavItem>
                <NavItem>
                    <Link className="btn btn-danger mr-1" to ={backUrl}>Back</Link>
                </NavItem>
            </Nav>
        </Container>
    </Navbar>
  )
}
