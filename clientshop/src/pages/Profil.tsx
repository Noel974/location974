import React from 'react';
import Container from 'react-bootstrap/Container';
import ProfilClient from '../Components/ProfilClient'; // adapte le chemin selon ton projet

const ProfilPage: React.FC = () => {
  return (
    <Container className="mt-4">
      <h1 className="mb-4">Mon Profil</h1>
      <ProfilClient />
    </Container>
  );
};

export default ProfilPage;
