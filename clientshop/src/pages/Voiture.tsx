import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UniversalCard from '../Components/Card'; // adapte le chemin si besoin
import { getAllVoitures, type Voiture } from '../Service/Api';

const VoituresPage: React.FC = () => {
  const [voitures, setVoitures] = useState<Voiture[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVoitures = async () => {
      const data = await getAllVoitures();
      setVoitures(data);
      setLoading(false);
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
      <h2 className="my-4">Nos voitures disponibles</h2>
      <Row>
        {voitures.map((voiture) => (
          <Col key={voiture._id} sm={12} md={6} lg={4}>
            <UniversalCard
              title={`${voiture.marque} ${voiture.modele}`}
             image={voiture.imageUrls[0]}// Cloudinary image URL
              description={`Année: ${voiture.annee} | Prix par jour: ${voiture.prixParJour}€`}
              buttonLabel="Détails"
              onClick={() => navigate(`/voitures/${voiture._id}`)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default VoituresPage;
