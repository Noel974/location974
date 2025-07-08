import React, { useState } from 'react';
import {
  Button,
  Container,
  Dropdown,
  Form,
  Modal,
  Nav,
  Navbar,
} from 'react-bootstrap';

import { registerClient, loginClient } from '../Service/ClientService'; // Chemin selon ton projet


const CustomNavbar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Login ou inscription

  // Etats pour formulaire login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Etats pour formulaire inscription
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState('');

const handleLogin = async () => {
  if (!loginEmail || !loginPassword) {
    alert('Veuillez remplir tous les champs pour vous connecter.');
    return;
  }

  try {
    const response = await loginClient({
      email: loginEmail,
      motDePasse: loginPassword,
    });

    localStorage.setItem('token', response.token);
    setIsAuthenticated(true);
    setShowModal(false);

    // Reset du formulaire
    setLoginEmail('');
    setLoginPassword('');
  } catch (error: any) {
    alert(error.message || 'Échec de la connexion.');
  }
};


const handleRegister = async () => {
  if (!registerEmail || !registerPassword || !registerConfirmPassword) {
    setRegisterError('Tous les champs sont obligatoires.');
    return;
  }
  if (registerPassword !== registerConfirmPassword) {
    setRegisterError('Les mots de passe ne correspondent pas.');
    return;
  }

  try {
    await registerClient({
      email: registerEmail,
      motDePasse: registerPassword,
      nom: 'John',       // 👈 à remplacer par des vrais champs si tu les ajoutes
      prenom: 'Doe',     // idem
    });

    setIsAuthenticated(true);
    setShowModal(false);
    setRegisterError('');

    // Reset
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterConfirmPassword('');
  } catch (error: any) {
    setRegisterError(error.message || 'Échec de l’inscription.');
  }
};


  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setRegisterError('');
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">MonSite</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/Voiture">Voiture</Nav.Link>
              <Nav.Link href="/Moto">Moto</Nav.Link>
            </Nav>

            <Nav className="ms-auto">
              {!isAuthenticated ? (
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  Connectez-vous
                </Button>
              ) : (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="success" id="dropdown-user">
                    Mon Compte
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#profil">Profil</Dropdown.Item>
                    <Dropdown.Item href="#histoire">Histoire</Dropdown.Item>
                    <Dropdown.Item href="#sinistre">Sinistre</Dropdown.Item>
                    <Dropdown.Item href="#penalite">Pénalité</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => setIsAuthenticated(false)}>
                      Déconnexion
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal de Connexion / Inscription */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isRegistering ? 'Inscription' : 'Connexion'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isRegistering ? (
            <Form>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Entrez votre email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="loginPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Mot de passe"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleLogin}>
                Se connecter
              </Button>

              <div className="mt-3">
                <small>
                  Pas encore de compte ?{' '}
                  <Button variant="link" onClick={toggleForm} style={{ padding: 0 }}>
                    Inscrivez-vous ici
                  </Button>
                </small>
              </div>
            </Form>
          ) : (
            <Form>
              {registerError && (
                <div className="alert alert-danger" role="alert">
                  {registerError}
                </div>
              )}

              <Form.Group className="mb-3" controlId="registerEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Entrez votre email"
                  value={registerEmail}
                  onChange={e => setRegisterEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="registerPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Mot de passe"
                  value={registerPassword}
                  onChange={e => setRegisterPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="registerConfirmPassword">
                <Form.Label>Confirmer le mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  value={registerConfirmPassword}
                  onChange={e => setRegisterConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="success" onClick={handleRegister}>
                S'inscrire
              </Button>

              <div className="mt-3">
                <small>
                  Déjà un compte ?{' '}
                  <Button variant="link" onClick={toggleForm} style={{ padding: 0 }}>
                    Connectez-vous ici
                  </Button>
                </small>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomNavbar;
