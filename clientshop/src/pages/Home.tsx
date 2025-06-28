import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import AboutSection from '../Components/About';

const Home: React.FC = () => {
  return (
    <>
      {/* Carousel Hero */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/assets/hero/societe.jpg"
            alt="Notre société"
          />
          <Carousel.Caption>
            <h3>Bienvenue chez AutoMotoPro</h3>
            <p>Votre expert en véhicules deux et quatre roues</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/assets/hero/voiture.jpg"
            alt="Nos voitures"
          />
          <Carousel.Caption>
            <h3>Un large choix de voitures</h3>
            <p>Fiables, modernes et adaptées à vos besoins</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/assets/hero/moto.jpg"
            alt="Nos motos"
          />
          <Carousel.Caption>
            <h3>Des motos performantes</h3>
            <p>Vivez la liberté sur deux roues</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Section À propos */}
      <Container className="mt-5">
        <AboutSection/>
      </Container>
    </>
  );
};

export default Home;
