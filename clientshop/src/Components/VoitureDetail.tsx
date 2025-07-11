import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createReservation } from '../Service/Reservation';

interface VoitureDetailProps {
  voiture: any;
  onClose: () => void;
}

const VoitureDetail = ({ voiture, onClose }: VoitureDetailProps) => {
  const [imageActive, setImageActive] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (voiture && voiture.imageUrls?.length > 0) {
      setImageActive(voiture.imageUrls[0]);
    }
  }, [voiture]);

const handleReservationSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const reservation = await createReservation({
      vehicule: voiture._id,
      vehiculeType: 'Voiture',
      dateDebut: startDate,
      dateFin: endDate
    });

    // Stocker temporairement dans le sessionStorage ou contexte
    sessionStorage.setItem('reservation', JSON.stringify({
      reservation,
      vehicule: voiture
    }));

    navigate('/Confir');
  } catch (error: any) {
    alert(error.message || 'Erreur lors de la réservation.');
  }
};

  if (!voiture) return <p>Chargement des données voiture...</p>;

  return (
    <Container className="my-5">
      <Button variant="secondary" onClick={onClose} className="mb-3">
        ← Retour
      </Button>

      <Card className="shadow-sm">
        <Card.Body>
          <Row>
            {/* Miniatures */}
            <Col md={2} className="d-flex flex-column gap-2">
              {voiture.imageUrls?.map((url: string, idx: number) => (
                <Image
                  key={idx}
                  src={url}
                  thumbnail
                  onMouseEnter={() => setImageActive(url)}
                  style={{
                    cursor: "pointer",
                    border: imageActive === url ? "2px solid #0d6efd" : "1px solid #ccc"
                  }}
                />
              ))}
            </Col>

            {/* Image principale */}
            <Col md={10}>
              <Image
                src={imageActive || 'https://via.placeholder.com/800x400'}
                fluid
                rounded
                className="mb-4"
              />

              <h2>{voiture.marque} {voiture.modele}</h2>
              <p><strong>Description :</strong> {voiture.description}</p>
              <Row>
                <Col md={6}>
                  <p><strong>Prix / jour :</strong> {voiture.prixParJour} €</p>
                  <p><strong>Boîte :</strong> {voiture.boiteVitesse}</p>
                  <p><strong>Carburant :</strong> {voiture.carburant}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Kilométrage :</strong> {voiture.kilometrage} km</p>
                  <p><strong>Mise en service :</strong> {new Date(voiture.dateMiseEnService).toLocaleDateString()}</p>
                </Col>
              </Row>

   <Button
  variant="primary"
  className="mt-3"
  onClick={() => {
    const token = localStorage.getItem('token');
    if (token) {
      setShowForm(true);
    } else {
      window.location.href = '/auth'; // ou utilise React Router si tu l’as
    }
  }}
>
  Réserver cette voiture
</Button>

            </Col>
          </Row>

          {/* Formulaire de réservation */}
          {showForm && (
            <Form onSubmit={handleReservationSubmit} className="mt-4 border-top pt-4">
              <h4>Réserver maintenant</h4>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="startDate" className="mb-3">
                    <Form.Label>Date de début</Form.Label>
                    <Form.Control
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="endDate" className="mb-3">
                    <Form.Label>Date de fin</Form.Label>
                    <Form.Control
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex gap-3">
                <Button variant="success" type="submit">
                  Confirmer la réservation
                </Button>
                <Button variant="outline-secondary" onClick={() => setShowForm(false)}>
                  Annuler
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default VoitureDetail;
