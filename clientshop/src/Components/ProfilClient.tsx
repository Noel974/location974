import React, { useEffect, useState } from 'react';
import { getClientProfile } from '../Service/ClientService';
import { Button, Card, Spinner, Alert } from 'react-bootstrap';

const ProfilClient: React.FC = () => {
  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const id = localStorage.getItem('clientId');
        if (!id) throw new Error("Identifiant du client introuvable.");

        const data = await getClientProfile(); 
        setClient(data);
      } catch (err: any) {
        setErreur(err.message || 'Erreur de chargement du profil');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = () => {
    alert('Fonction de mise à jour à implémenter');
  };

  const handleDelete = () => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer ce compte ?');
    if (confirmed) {
      alert('Fonction de suppression à implémenter');
    }
  };

  if (loading) {
    return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  }

  if (erreur) {
    return <Alert variant="danger" className="mt-4">{erreur}</Alert>;
  }

  if (!client) return null;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <Card style={{ width: '100%', maxWidth: '600px' }} className="shadow">
        <Card.Body className="text-center">
          <img
            src={client.photoUrl || 'https://via.placeholder.com/150'}
            alt="Photo de profil"
            className="rounded-circle mb-3"
            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          />
          <Card.Title>{client.prenom} {client.nom}</Card.Title>
          <Card.Text>
            <strong>Email :</strong> {client.email}<br />
            <strong>Téléphone :</strong> {client.telephone || 'Non renseigné'}<br />
            <strong>Adresse :</strong> {client.adresse || 'Non renseignée'}<br />
            <strong>Date d'inscription :</strong> {new Date(client.dateInscription).toLocaleDateString()}<br />
            <strong>Niveau de fidélité :</strong> {client.systemeFidelite?.niveau || 'Non défini'}
          </Card.Text>

          <div className="d-flex justify-content-center gap-3 mt-3">
            <Button variant="primary" onClick={handleUpdate}>
              Mettre à jour
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Supprimer
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfilClient;
