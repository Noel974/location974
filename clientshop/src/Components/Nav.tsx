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
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/Voiture">Voiture</Nav.Link>
            <Nav.Link href="/Moto">Moto</Nav.Link>
          </Nav>

          {/* Dropdown à droite */}
          <Nav>
            <NavDropdown title="Mon Compte" id="account-dropdown" align="end">
              <NavDropdown.Item href="/Profil">Profil</NavDropdown.Item>
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
