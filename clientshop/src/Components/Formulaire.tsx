import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { updateClientProfile } from '../Service/ClientService';

interface Props {
  client: any;
  onClose: () => void;
  onUpdateSuccess: (updated: any) => void;
}

const FormulaireMiseAJourClient: React.FC<Props> = ({ client, onClose, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    nom: client.nom,
    prenom: client.prenom,
    telephone: client.telephone || '',
    adresse: client.adresse || '',
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const [permis, setPermis] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updated = await updateClientProfile(formData, { photo: photo || undefined, permis: permis || undefined });
      onUpdateSuccess(updated);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <Card style={{ width: '100%', maxWidth: '600px' }} className="shadow">
        <Card.Body>
          <h5 className="text-center mb-3">Mise à jour du profil</h5>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" name="nom" value={formData.nom} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prénom</Form.Label>
              <Form.Control type="text" name="prenom" value={formData.prenom} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Téléphone</Form.Label>
              <Form.Control type="text" name="telephone" value={formData.telephone} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Adresse</Form.Label>
              <Form.Control type="text" name="adresse" value={formData.adresse} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Photo de profil</Form.Label>
              <Form.Control type="file" onChange={(e) => setPhoto(e.target.files?.[0] || null)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Photo du permis</Form.Label>
              <Form.Control type="file" onChange={(e) => setPermis(e.target.files?.[0] || null)} />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={onClose}>
                Annuler
              </Button>
              <Button variant="primary" type="submit">
                Enregistrer
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FormulaireMiseAJourClient;
