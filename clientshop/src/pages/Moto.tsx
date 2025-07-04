import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UniversalCard from '../Components/Card'; // adapte le chemin si besoin
import { getMotos } from '../Service/Api';

// ✅ Définition du type Moto (à adapter selon ta structure réelle)
interface Moto {
  _id: string;
  marque: string;
  modele: string;
  annee: number;
  prixParJour: number;
  imageUrls: string[];
}

const MotoPage: React.FC = () => {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

useEffect(() => {
  const fetchMotos = async () => {
    try {
      const data = await getMotos();
      console.log("Données reçues:", data); // <== Vérifie ici
      if (Array.isArray(data)) {
        setMotos(data);
      } else {
        setMotos([]);
      }
    } catch (error) {
      console.error(error);
      setMotos([]);
    } finally {
      setLoading(false);
    }
  };
  fetchMotos();
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
      <h2 className="my-4">Nos motos disponibles</h2>
      <Row>
{Array.isArray(motos) ? (
  motos.map((moto) => (
    <Col key={moto._id} sm={12} md={6} lg={4}>
      <UniversalCard
        title={`${moto.marque} ${moto.modele}`}
        image={moto.imageUrls[0]}
        description={`Année: ${moto.annee || "N/A"} | Prix par jour: ${moto.prixParJour}€`}
        buttonLabel="Détails"
        onClick={() => navigate(`/Moto/${moto._id}`)}
      />
    </Col>
  ))
) : (
  <p>Erreur lors du chargement des motos.</p>
)}

      </Row>
    </Container>
  );
};

export default MotoPage;
