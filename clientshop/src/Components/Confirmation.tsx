import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { getClientProfile } from '../Service/ClientService';

interface Vehicule {
  imageUrls?: string[];
  marque: string;
  modele: string;
}

interface Reservation {
  dateDebut: string;
  dateFin: string;
  prixTotal: number;
}

const Confirmation: React.FC = () => {
  const [client, setClient] = useState<Awaited<ReturnType<typeof getClientProfile>> | null>(null);
  const [vehicule, setVehicule] = useState<Vehicule | null>(null);
  const [reservation, setReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    const reservationData = sessionStorage.getItem('reservation');

    const fetchData = async () => {
      try {
        const profile = await getClientProfile();
        setClient(profile);
      } catch (err: any) {
        console.error('Erreur profil client :', err.message);
      }
    };

    if (reservationData) {
      try {
        const parsed = JSON.parse(reservationData);
        setVehicule(parsed.vehicule);
        setReservation(parsed.reservation);
        fetchData();
      } catch (error) {
        console.error("Erreur lors du parsing de la réservation :", error);
      }
    }
  }, []);

  if (!client || !vehicule || !reservation) {
    return (
      <Alert variant="danger" className="mt-5 text-center">
        Données de confirmation manquantes.
      </Alert>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Finaliser votre demande</h2>
      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>Informations client</Card.Title>
              <Card.Text>
                <strong>Nom :</strong> {client.prenom} {client.nom}<br />
                <strong>Email :</strong> {client.email}<br />
                <strong>Téléphone :</strong> {client.telephone || 'Non renseigné'}<br />
                <strong>Adresse :</strong> {client.adresse || 'Non renseignée'}<br />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow">
            {vehicule.imageUrls?.[0] && (
              <Card.Img variant="top" src={vehicule.imageUrls[0]} alt={`${vehicule.marque} ${vehicule.modele}`} />
            )}
            <Card.Body>
              <Card.Title>{vehicule.marque} {vehicule.modele}</Card.Title>
              <Card.Text>
                <strong>Du :</strong> {new Date(reservation.dateDebut).toLocaleDateString()}<br />
                <strong>Au :</strong> {new Date(reservation.dateFin).toLocaleDateString()}<br />
                <strong>Prix total :</strong> {reservation.prixTotal} €<br />
              </Card.Text>
              <Button variant="success" className="mt-2">
                Payer
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Confirmation;
