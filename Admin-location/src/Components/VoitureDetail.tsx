import { useState } from "react";
import { updateVoiture } from "../Services/VoitureService"; // Ajouté
import EntretienForm from "./EntretienForm";
import EditVehicleForm from "./ModifierForm";

interface VoitureDetailProps {
  voiture: any;
  onClose: () => void;
}

const VoitureDetail = ({ voiture, onClose }: VoitureDetailProps) => {
  const [imageActive, setImageActive] = useState(voiture.imageUrls[0]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showEntretienForm, setShowEntretienForm] = useState(false);

  const handleEditClick = () => {
    setShowEditForm(!showEditForm);
  };

  const handleDelete = () => {
    if (window.confirm("🗑️ Êtes-vous sûr de vouloir supprimer cette voiture ?")) {
      // 🔁 Appelle ton service de suppression ici
      console.log("Suppression voiture", voiture._id);
      // Par exemple : await deleteVoiture(voiture._id);
      onClose(); // revenir à la liste
    }
  };

  return (
    <div className="voiture-detail">
      <button onClick={onClose} className="btn-retour">← Retour</button>
      <h2>{voiture.marque} {voiture.modele}</h2>

      <div className="voiture-article">
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

      {/* Boutons Modifier et Entretien */}
      <div className="d-flex gap-2 mt-4">
        <button onClick={handleEditClick} className="btn btn-warning">
          {showEditForm ? "❌ Fermer Édition" : "🛠️ Modifier"}
        </button>
        <button onClick={() => setShowEntretienForm(!showEntretienForm)} className="btn btn-secondary">
          {showEntretienForm ? "❌ Fermer Entretien" : "🔧 Entretien"}
        </button>
      </div>

      {/* Accordion pour modification */}
      {showEditForm && (
        <div className="accordion mt-3" id="editAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingEdit">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseEdit"
                aria-expanded="true"
                aria-controls="collapseEdit"
              >
                Modifier la voiture
              </button>
            </h2>
            <div
              id="collapseEdit"
              className="accordion-collapse collapse show"
              aria-labelledby="headingEdit"
            >
              <div className="accordion-body">
                <EditVehicleForm
                  vehicle={voiture}
                  onUpdate={updateVoiture}
                  onClose={onClose}
                  type="voiture"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Accordion pour entretien */}
      {showEntretienForm && (
        <div className="accordion mt-3" id="entretienAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingEntretien">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseEntretien"
                aria-expanded="true"
                aria-controls="collapseEntretien"
              >
                Formulaire d'entretien
              </button>
            </h2>
            <div
              id="collapseEntretien"
              className="accordion-collapse collapse show"
              aria-labelledby="headingEntretien"
            >
              <div className="accordion-body">
                <EntretienForm voiture={voiture} onClose={() => setShowEntretienForm(false)} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bouton de suppression */}
      <div className="mt-4 text-end">
        <button onClick={handleDelete} className="btn btn-outline-danger">
          🗑️ Supprimer cette voiture
        </button>
      </div>
    </div>
  );
};

export default VoitureDetail;
