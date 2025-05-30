import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EntretienForm from './EntretienForm';


interface VoitureDetailProps {
  voiture: any;
  onClose: () => void;
}

const VoitureDetail = ({ voiture, onClose }: VoitureDetailProps) => {
  const [imageActive, setImageActive] = useState(voiture.imageUrls[0]);
  const navigate = useNavigate();
const [showEntretienForm, setShowEntretienForm] = useState(false);

  const handleEdit = () => {
    navigate(`/modifier-voiture/${voiture._id}`);
  };

  const handleDelete = () => {
    if (window.confirm("🗑️ Êtes-vous sûr de vouloir supprimer cette voiture ?")) {
      // 🔁 Appelle ton service de suppression ici
      console.log("Suppression voiture", voiture._id);
      // Par exemple : await deleteVoiture(voiture._id);
      onClose(); // revenir à la liste
    }
  };
const handleMaintenance = () => {
  setShowEntretienForm(true);
};


  return (
    <div className="voiture-detail">
      <button onClick={onClose} className="btn-retour">← Retour</button>
      <h2>{voiture.marque} {voiture.modele}</h2>

      <div className="voiture-article">
        {/* Miniatures */}
        <div className="voiture-thumbnails">
          {voiture.imageUrls.map((url: string, index: number) => (
            <img
              key={index}
              src={url}
              alt={`Miniature ${index}`}
              className="thumbnail"
              onMouseEnter={() => setImageActive(url)}
            />
          ))}
        </div>

        {/* Image principale */}
        <div className="voiture-main-image">
          <img src={imageActive} alt="Image principale" />
        </div>
      </div>

      <p>Description: {voiture.description}</p>
      <p>Prix/jour: {voiture.prixParJour}€</p>
      <p>Boîte: {voiture.boiteVitesse}</p>
      <p>Carburant: {voiture.carburant}</p>
      <p>Kilométrage: {voiture.kilometrage} km</p>
      <p>Mise en service: {new Date(voiture.dateMiseEnService).toLocaleDateString()}</p>

      {/* Boutons d'action */}
      <div className="d-flex gap-2 mt-4">
        <button onClick={handleEdit} className="btn btn-warning">🛠️ Modifier</button>
        <button onClick={handleDelete} className="btn btn-danger">🗑️ Supprimer</button>
        <button onClick={handleMaintenance} className="btn btn-secondary">Entretien{showEntretienForm && (
  <EntretienForm voiture={voiture} onClose={() => setShowEntretienForm(false)} />
)}</button>
      </div>
    </div>
  );
};

export default VoitureDetail;
