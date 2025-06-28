import React from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row className="align-items-center">
          {/* Logo et nom */}
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <img
              src="/assets/logo.png"
              alt="Logo AutoMotoPro"
              style={{ width: '40px', marginRight: '10px' }}
            />
            <span className="fw-bold">AutoMotoPro</span>
          </Col>

          {/* Liens navigation */}
          <Col md={4} className="text-center mb-3 mb-md-0">
            <Nav className="justify-content-center">
              <Nav.Link href="/" className="text-light px-2">Home</Nav.Link>
              <Nav.Link href="/voitures" className="text-light px-2">Voiture</Nav.Link>
              <Nav.Link href="/motos" className="text-light px-2">Moto</Nav.Link>
            </Nav>
          </Col>

          {/* Liens légaux */}
          <Col md={4} className="text-center text-md-end">
            <Nav className="justify-content-center justify-content-md-end">
              <Nav.Link href="/ConditionsPage" className="text-light px-2">Conditions</Nav.Link>
              <Nav.Link href="/MentionsLegales" className="text-light px-2">Mentions légales</Nav.Link>
              <Nav.Link href="/FAQPage" className="text-light px-2">FAQ</Nav.Link>
            </Nav>
            <small className="d-block mt-2">&copy; {year} AutoMotoPro. Tous droits réservés.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
