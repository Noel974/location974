import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EntretienForm from './EntretienForm';

interface MotoDetailProps {
  moto: {
    _id: string;
    marque: string;
    modele: string;
    imageUrls: string[];
    description: string;
    prixParJour: number;
    boiteVitesse: string;
    carburant: string;
    kilometrage: number;
    dateMiseEnService: string;
  };
  onClose: () => void;
}

const MotoDetail = ({ moto, onClose }: MotoDetailProps) => {
  const [imageActive, setImageActive] = useState(moto.imageUrls[0]);
  const navigate = useNavigate();
  const [showEntretienForm, setShowEntretienForm] = useState(false);

  const handleEdit = () => {
    navigate(`/modifier-moto/${moto._id}`);
  };

  const handleDelete = () => {
    if (window.confirm("🗑️ Êtes-vous sûr de vouloir supprimer cette moto ?")) {
      console.log("Suppression moto", moto._id);
      // Exemple : await deleteMoto(moto._id);
      onClose();
    }
  };

  const handleMaintenance = () => {
    setShowEntretienForm(true);
  };

  const resolveUrl = (url: string) => {
    return url.startsWith("http") ? url : `http://localhost:3100${url}`;
  };

  return (
    <div className="container mt-5">
      <button onClick={onClose} className="btn btn-outline-secondary mb-3">
        ← Retour
      </button>

      <h2 className="fw-bold mb-4 text-center">
        {moto.marque} {moto.modele}
      </h2>

      <div className="row">
        <div className="col-md-3 d-flex flex-column align-items-center">
          {moto.imageUrls.map((url, index) => (
            <img
              key={index}
              src={resolveUrl(url)}
              alt={`Miniature ${index}`}
              className={`thumbnail img-fluid mb-2 ${imageActive === url ? "border border-primary shadow" : ""}`}
              onClick={() => setImageActive(url)}
              style={{ width: "80px", height: "80px", borderRadius: "8px", cursor: "pointer" }}
            />
          ))}
        </div>

        <div className="col-md-9">
          <div className="moto-main-image text-center">
            <img
              src={resolveUrl(imageActive)}
              alt="Moto principale"
              className="img-fluid rounded shadow-lg"
              style={{ maxHeight: "450px", width: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-light rounded shadow">
        <p className="lead"><strong>Description:</strong> {moto.description}</p>
        <p><strong>Prix/jour:</strong> <span className="text-success fw-bold">{moto.prixParJour}€</span></p>
        <p><strong>Boîte:</strong> {moto.boiteVitesse}</p>
        <p><strong>Carburant:</strong> {moto.carburant}</p>
        <p><strong>Kilométrage:</strong> {moto.kilometrage} km</p>
        <p><strong>Mise en service:</strong> {new Date(moto.dateMiseEnService).toLocaleDateString()}</p>

        <div className="d-flex gap-2 mt-4">
          <button onClick={handleEdit} className="btn btn-warning">🛠️ Modifier</button>
          <button onClick={handleDelete} className="btn btn-danger">🗑️ Supprimer</button>
                  <button onClick={handleMaintenance} className="btn btn-secondary">Entretien{showEntretienForm && (
  <EntretienForm moto={moto} onClose={() => setShowEntretienForm(false)} />
)}</button>
        </div>
      
      </div>
    </div>
  );
};

export default MotoDetail;
