import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AwesomeButton } from 'react-awesome-button';

const login = false;

const NavbarComponent = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Quiz</Navbar.Brand>
                {
                    login ? <NavLink to="/profile" className="profile-svg"><CgProfile /></NavLink> : <NavLink to="/login">
                        <AwesomeButton type='secondary'>Login</AwesomeButton></NavLink>
                }
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;