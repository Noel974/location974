import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UniversalCard from '../Components/Card'; // ajuste le chemin selon ton projet
import { getAllVoitures, type Voiture } from '../Service/Api';

const VoituresPage: React.FC = () => {
  const [voitures, setVoitures] = useState<Voiture[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVoitures = async () => {
      try {
        const data = await getAllVoitures();
        setVoitures(data);
      } catch (error) {
        console.error("Erreur lors du chargement des voitures :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVoitures();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container>
      <h2 className="my-4 text-center">Nos voitures disponibles</h2>
      <Row>
        {voitures.map((voiture) => (
          <Col key={voiture._id} sm={12} md={6} lg={4}>
            <UniversalCard
              title={`${voiture.marque} ${voiture.modele}`}
              image={voiture.imageUrls?.[0]} // ajout du "?" pour éviter une erreur si undefined
              description={`Année : ${voiture.annee} | Prix/jour : ${voiture.prixParJour}€`}
                statusText={!voiture.disponible ? 'Louée' : undefined}
              buttonLabel={voiture.disponible ? 'Détails' : '🚫 Louée'}
              buttonVariant={voiture.disponible ? 'primary' : 'danger'}
              onClick={
                voiture.disponible
                  ? () => navigate(`/voitures/${voiture._id}`)
                  : undefined
              }
              showButton={voiture.disponible}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default VoituresPage;
