import React, { useEffect, useState } from 'react';
import { getClientById } from '../Service/ClientService';

const ProfilClient: React.FC = () => {
  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const clientId = localStorage.getItem('clientId'); // à enregistrer après login
        const token = localStorage.getItem('token');
        if (!clientId || !token) return;

        const data = await getClientById(clientId, token);
        setClient(data);
      } catch (err: any) {
        setErreur(err.message || 'Erreur de chargement du profil.');
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, []);

  if (loading) return <div>Chargement du profil...</div>;
  if (erreur) return <div style={{ color: 'red' }}>{erreur}</div>;
  if (!client) return null;

  return (
    <div>
      <h2>Bienvenue {client.prenom} {client.nom}</h2>
      <p><strong>Email :</strong> {client.email}</p>
      <p><strong>Téléphone :</strong> {client.telephone || 'Non renseigné'}</p>
      <p><strong>Adresse :</strong> {client.adresse || 'Non renseignée'}</p>
      <p><strong>Date d'inscription :</strong> {new Date(client.dateInscription).toLocaleDateString()}</p>
      <p><strong>Niveau de fidélité :</strong> {client.systemeFidelite?.niveau}</p>
    </div>
  );
};

export default ProfilClient;
