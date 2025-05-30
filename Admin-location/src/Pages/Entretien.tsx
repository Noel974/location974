import React, { useEffect, useState } from 'react';
import { getEntretien } from '../Services/EntretienService';

interface Entretien {
  _id: string;
  idEntretien: string;
  idVehicule:string;
  typeVehicule: string;
  typeEntretien: string;
  dateEntretien: string;
  coût: number;
  commentaire?: string;
}

const ListeEntretiens: React.FC = () => {
  const [entretiens, setEntretiens] = useState<Entretien[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
const fetchEntretiens = async () => {
  try {
    const data = await getEntretien();
    setEntretiens(data);
  } catch (err) {
    setError('Erreur lors du chargement des entretiens');
    console.error(err);
  } finally {
    setLoading(false);
  }
};

    fetchEntretiens();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Liste des entretiens</h2>
      {entretiens.length === 0 ? (
        <p>Aucun entretien trouvé.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type véhicule</th>
              <th>Type entretien</th>
              <th>Date</th>
              <th>Coût</th>
              <th>Commentaire</th>
            </tr>
          </thead>
          <tbody>
            {entretiens.map((entretien) => (
              <tr key={entretien._id}>
                <td>{entretien.idEntretien}</td>
                <td>{entretien.typeVehicule}</td>
                <td>{entretien.typeEntretien}</td>
                <td>{new Date(entretien.dateEntretien).toLocaleDateString()}</td>
                <td>{entretien.coût} €</td>
                <td>{entretien.commentaire || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListeEntretiens;
