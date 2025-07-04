import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import AboutSection from '../Components/About';

const Home: React.FC = () => {
  return (
    <>
      {/* Carousel Hero */}
      <Container className="carousel-wrapper my-4">
  <div className="carousel-frame">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/assets/auto.jpeg"
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
            src="/assets/car.webp"
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
            src="/assets/moto.webp"
            alt="Nos motos"
          />
          <Carousel.Caption>
            <h3>Des motos performantes</h3>
            <p>Vivez la liberté sur deux roues</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
  </div>
  </Container>


      {/* Section À propos */}
      <Container className="mt-5">
              <h2 className="pb-2 border-bottom">À propos de nous</h2>
        <AboutSection/>
      </Container>
    </>
  );
};

export default Home;
