import { useEffect, useState } from "react";

interface MotoDetailProps {
  Moto: any;
  onClose: () => void;
}

const MotoDetail = ({ Moto, onClose }: MotoDetailProps) => {
  const [imageActive, setImageActive] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (Moto && Moto.imageUrls?.length > 0) {
      setImageActive(Moto.imageUrls[0]);
    }
  }, [Moto]);

  if (!Moto) return <p>Chargement des données Moto...</p>;

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Réservé du ${startDate} au ${endDate} pour la ${Moto.marque} ${Moto.modele}`);
    // Ici tu pourrais appeler une API ou passer les données au parent
    setShowForm(false);
  };

  return (
    <div className="Moto-detail" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <button onClick={onClose} className="btn-retour">← Retour</button>

      <h2 style={{ marginBottom: '20px' }}>
        {Moto.marque} {Moto.modele}
      </h2>

      <div className="Moto-article" style={{ display: 'flex', gap: '20px' }}>
        <div className="Moto-thumbnails" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {Moto.imageUrls?.map((url: string, index: number) => (
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

        <div className="Moto-main-image" style={{ flex: 1 }}>
          {imageActive ? (
            <img src={imageActive} alt="Image principale" style={{ width: '100%', borderRadius: '8px' }} />
          ) : (
            <p>Pas d’image disponible</p>
          )}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <p><strong>Description:</strong> {Moto.description}</p>
        <p><strong>Prix/jour:</strong> {Moto.prixParJour}€</p>
        <p><strong>Boîte:</strong> {Moto.boiteVitesse}</p>
        <p><strong>Carburant:</strong> {Moto.carburant}</p>
        <p><strong>Kilométrage:</strong> {Moto.kilometrage} km</p>
        <p><strong>Mise en service:</strong> {new Date(Moto.dateMiseEnService).toLocaleDateString()}</p>

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
          Réserver cette Moto
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

export default MotoDetail;
