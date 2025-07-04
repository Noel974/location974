import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ImageCirculaire from '../utils/ImageCirculaire';

const AboutSection: React.FC = () => {
  return (
    
    <Container className="px-4 py-5" id="about">


      {/* Bloc Société */}
      <Row className="colored-row g-5 py-5 row-cols-1 row-cols-lg-2 align-items-center">
        <Col>
          <h3 className="fw-bold text-primary">Notre Société</h3>
          <p className="text-muted">
            AutoMotoPro est située au cœur de Paris. Nous vous accueillons au 25 rue des Mécaniciens, 75010 Paris. 
            Contactez-nous au 01 23 45 67 89 ou via <strong>contact@automotopro.fr</strong>.
          </p>
        </Col>
        <Col className='map'>
      <ImageCirculaire src="/assets/map.png" alt="Map" size={180} borderColor="#2ecc71" />
              </Col>
      </Row>

      {/* Bloc Directeur */}
      <Row className="colored-row g-5 py-5 row-cols-1 row-cols-lg-2 align-items-center flex-lg-row-reverse">
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
           <ImageCirculaire src="/assets/dire.jpg" alt="Map" size={180} borderColor="#2ecc71" />
        </Col>
      </Row>

      {/* Bloc Voitures */}
      <Row className="colored-row g-5 py-5 row-cols-1 row-cols-lg-2 align-items-center">
        <Col>
          <h3 className="fw-bold text-dark">Nos Voitures</h3>
          <p className="text-muted">
            Découvrez notre large gamme de voitures modernes et économiques, adaptées à tous vos besoins personnels ou professionnels.
          </p>
        </Col>
        <Col className="image-row">
        <div className="p-1">
          <ImageCirculaire src="/assets/sport.jpeg" alt="Map" size={180} borderColor="#2ecc71" />

        </div>
           <ImageCirculaire src="/assets/luxe.jpg" alt="Map" size={180} borderColor="#2ecc71" />
        </Col>
      </Row>

      {/* Bloc Motos */}
      <Row className="colored-row g-5 py-5 row-cols-1 row-cols-lg-2 align-items-center flex-lg-row-reverse">
        <Col>
          <h3 className="fw-bold text-dark">Nos Motos</h3>
          <p className="text-muted">
            Que vous soyez passionné de vitesse ou amateur de balades, nos motos allient performance et sécurité.
          </p>
        </Col>
        <Col className="image-row">
        <div className="p-2">
 <ImageCirculaire src="/assets/tou.webp" alt="Map" size={180} borderColor="#2ecc71" />
        </div>
            
           <ImageCirculaire src="/assets/cust.jpeg" alt="Map" size={180} borderColor="#2ecc71" />
        </Col>
      </Row>
    </Container>
  );
};

export default AboutSection;
