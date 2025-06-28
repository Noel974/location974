import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

const AboutSection: React.FC = () => {
  return (
    <Container className="px-4 py-5" id="about">
      <h2 className="pb-2 border-bottom">À propos de nous</h2>

      {/* Bloc Société */}
      <Row className="g-5 py-5 row-cols-1 row-cols-lg-2 align-items-center">
        <Col>
          <h3 className="fw-bold text-primary">Notre Société</h3>
          <p className="text-muted">
            AutoMotoPro est située au cœur de Paris. Nous vous accueillons au 25 rue des Mécaniciens, 75010 Paris. 
            Contactez-nous au 01 23 45 67 89 ou via <strong>contact@automotopro.fr</strong>.
          </p>
        </Col>
        <Col>
          <Image src="/assets/map.png" alt="Map" fluid rounded />
        </Col>
      </Row>

      {/* Bloc Directeur */}
      <Row className="g-5 py-5 row-cols-1 row-cols-lg-2 align-items-center flex-lg-row-reverse">
        <Col>
          <h3 className="fw-bold text-success">Le Directeur</h3>
          <p className="text-muted mb-2">
            <strong>Jean Dupont</strong> – Directeur général.
          </p>
          <p className="fst-italic text-secondary">
            "Notre mission est simple : vous garantir la meilleure expérience en matière de mobilité. AutoMotoPro, c'est la passion avant tout."
          </p>
        </Col>
        <Col>
          <Image src="/assets/directeur.jpg" alt="Jean Dupont" fluid rounded />
        </Col>
      </Row>

      {/* Bloc Voitures */}
      <Row className="g-5 py-5 row-cols-1 row-cols-lg-2 align-items-center">
        <Col>
          <h3 className="fw-bold text-dark">Nos Voitures</h3>
          <p className="text-muted">
            Découvrez notre large gamme de voitures modernes et économiques, adaptées à tous vos besoins personnels ou professionnels.
          </p>
        </Col>
        <Col>
          <Image src="/assets/voitures/tesla.jpg" alt="Voiture" fluid rounded />
        </Col>
      </Row>

      {/* Bloc Motos */}
      <Row className="g-5 py-5 row-cols-1 row-cols-lg-2 align-items-center flex-lg-row-reverse">
        <Col>
          <h3 className="fw-bold text-dark">Nos Motos</h3>
          <p className="text-muted">
            Que vous soyez passionné de vitesse ou amateur de balades, nos motos allient performance et sécurité.
          </p>
        </Col>
        <Col>
          <Image src="/assets/motos/yamaha.jpg" alt="Moto" fluid rounded />
        </Col>
      </Row>
    </Container>
  );
};

export default AboutSection;
