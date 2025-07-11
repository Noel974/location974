import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

interface ClientInfo {
  nom: string;
  prenom: string;
}

const MyNavbar: React.FC = () => {
  const [client, setClient] = useState<ClientInfo | null>(null);

useEffect(() => {
  const updateClient = () => {
    const storedClient = localStorage.getItem('client');
    if (storedClient) {
      try {
        const parsedClient = JSON.parse(storedClient);
        setClient({ nom: parsedClient.nom, prenom: parsedClient.prenom });
      } catch (e) {
        setClient(null);
      }
    } else {
      setClient(null);
    }
  };

  // Lecture initiale
  updateClient();

  // Mise à jour en écoutant les changements
  window.addEventListener('clientChanged', updateClient);

  return () => {
    window.removeEventListener('clientChanged', updateClient);
  };
}, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('client');
    localStorage.removeItem('clientId');
    setClient(null);
    window.location.href = '/'; // ou utilise le routeur si tu as React Router
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#">MonEntreprise</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="mx-auto">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/Voiture">Voiture</Nav.Link>
            <Nav.Link href="/Moto">Moto</Nav.Link>
          </Nav>

          <Nav>
            {client ? (
              <NavDropdown
                title={`${client.prenom} ${client.nom}`}
                id="account-dropdown"
                align="end"
              >
                <NavDropdown.Item href="/Profil">Profil</NavDropdown.Item>
                <NavDropdown.Item href="#parametres">Paramètres</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Déconnexion</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/auth">Se connecter</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
