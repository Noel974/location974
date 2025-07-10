import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const MyNavbar: React.FC = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        {/* Logo à gauche */}
        <Navbar.Brand href="#">MonEntreprise</Navbar.Brand>

        {/* Toggler pour mobile */}
        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          {/* Navigation au centre */}
          <Nav className="mx-auto">
            <Nav.Link href="#accueil">Accueil</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#projets">Projets</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>

          {/* Dropdown à droite */}
          <Nav>
            <NavDropdown title="Mon Compte" id="account-dropdown" align="end">
              <NavDropdown.Item href="#profil">Profil</NavDropdown.Item>
              <NavDropdown.Item href="#parametres">Paramètres</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#deconnexion">Déconnexion</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
