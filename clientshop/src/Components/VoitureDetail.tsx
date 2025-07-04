import { useEffect, useState } from "react";

interface VoitureDetailProps {
  voiture: any;
  onClose: () => void;
}

const VoitureDetail = ({ voiture, onClose }: VoitureDetailProps) => {
  const [imageActive, setImageActive] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (voiture && voiture.imageUrls?.length > 0) {
      setImageActive(voiture.imageUrls[0]);
    }
  }, [voiture]);

  if (!voiture) return <p>Chargement des données voiture...</p>;

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Réservé du ${startDate} au ${endDate} pour la ${voiture.marque} ${voiture.modele}`);
    // Ici tu pourrais appeler une API ou passer les données au parent
    setShowForm(false);
  };

  return (
    <div className="voiture-detail" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <button onClick={onClose} className="btn-retour">← Retour</button>

      <h2 style={{ marginBottom: '20px' }}>
        {voiture.marque} {voiture.modele}
      </h2>

      <div className="voiture-article" style={{ display: 'flex', gap: '20px' }}>
        <div className="voiture-thumbnails" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {voiture.imageUrls?.map((url: string, index: number) => (
            <img
              key={index}
              src={url}
              alt={`Miniature ${index}`}
              className="thumbnail"
              onMouseEnter={() => setImageActive(url)}
              style={{ width: '80px', height: '60px', cursor: 'pointer', objectFit: 'cover', border: imageActive === url ? '2px solid blue' : '1px solid #ccc' }}
            />
          ))}
        </div>

        <div className="voiture-main-image" style={{ flex: 1 }}>
          {imageActive ? (
            <img src={imageActive} alt="Image principale" style={{ width: '100%', borderRadius: '8px' }} />
          ) : (
            <p>Pas d’image disponible</p>
          )}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <p><strong>Description:</strong> {voiture.description}</p>
        <p><strong>Prix/jour:</strong> {voiture.prixParJour}€</p>
        <p><strong>Boîte:</strong> {voiture.boiteVitesse}</p>
        <p><strong>Carburant:</strong> {voiture.carburant}</p>
        <p><strong>Kilométrage:</strong> {voiture.kilometrage} km</p>
        <p><strong>Mise en service:</strong> {new Date(voiture.dateMiseEnService).toLocaleDateString()}</p>

        <button
          onClick={() => setShowForm(true)}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Réserver cette voiture
        </button>

        {showForm && (
          <form onSubmit={handleReservationSubmit} style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h3>Réservation</h3>
            <div style={{ marginBottom: '10px' }}>
              <label>Date de début: </label><br />
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Date de fin: </label><br />
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </div>
            <button type="submit" style={{ backgroundColor: '#28a745', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '5px' }}>
              Confirmer la réservation
            </button>
            <button type="button" onClick={() => setShowForm(false)} style={{ marginLeft: '10px', padding: '8px 16px' }}>
              Annuler
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default VoitureDetail;
