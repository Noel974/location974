import React, { useEffect, useState } from 'react';
import { getClientById } from '../Service/ClientService';

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
        
        const data = await getClientById(id);
        setClient(data);
      } catch (err: any) {
        setErreur(err.message || 'Erreur de chargement du profil');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
