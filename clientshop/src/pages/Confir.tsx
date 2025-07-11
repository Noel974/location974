import React from 'react';
import Container from 'react-bootstrap/Container';
import Confirmation from '../Components/Confirmation';

const ConfirPage: React.FC = () => {
  return (
    <Container className="mt-4">
      <h1 className="mb-4">Confirmation Réservation</h1>
      <Confirmation />
    </Container>
  );
};

export default ConfirPage;
