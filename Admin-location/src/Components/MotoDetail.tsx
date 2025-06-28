import { useState } from "react";
import {deleteMotoById, updateMoto} from "../Services/MotoService";
import EntretienForm from './EntretienForm';
import EditVehicleForm from "./ModifierForm";

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
const [showEditForm, setShowEditForm] = useState(false);
const [showEntretienForm, setShowEntretienForm] = useState(false);

// Remplace l'ancien handleEdit :
const handleEditClick = () => {
  setShowEditForm(!showEditForm);
};

const handleDelete = async () => {
  if (window.confirm("🗑️ Êtes-vous sûr de vouloir supprimer cette moto ?")) {
    try {
      console.log("Suppression moto", moto._id);
      await deleteMotoById(moto._id);
      alert("✅ Moto supprimée avec succès !");
      onClose(); // Ferme la vue détail
    } catch (error) {
      alert("❌ Une erreur est survenue lors de la suppression.");
      console.error(error);
    }
  }
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

        {/* Boutons Modifier et Entretien */}
        <div className="d-flex gap-2 mt-4">
    <button onClick={handleEditClick} className="btn btn-warning">
    {showEditForm ? "❌ Fermer Édition" : "🛠️ Modifier"}
  </button>
          <button onClick={() => setShowEntretienForm(!showEntretienForm)} className="btn btn-secondary">
            {showEntretienForm ? "❌ Fermer Entretien" : "🔧 Entretien"}
          </button>
        </div>
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
          Modifier la moto
        </button>
      </h2>
      <div
        id="collapseEdit"
        className="accordion-collapse collapse show"
        aria-labelledby="headingEdit"
      >
        <div className="accordion-body">
    <EditVehicleForm vehicle={moto} onUpdate={updateMoto} onClose={onClose} type="moto" />
        </div>
      </div>
    </div>
  </div>
)}
        {/* Accordion entretien */}
        {showEntretienForm && (
          <div className="accordion mt-3" id="entretienAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingEntretien">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEntretien" aria-expanded="true" aria-controls="collapseEntretien">
                  Formulaire d'entretien
                </button>
              </h2>
              <div id="collapseEntretien" className="accordion-collapse collapse show" aria-labelledby="headingEntretien">
                <div className="accordion-body">
                  <EntretienForm moto={moto} onClose={() => setShowEntretienForm(false)} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bouton Supprimer déplacé ici */}
      <div className="mt-4 text-end">
        <button onClick={handleDelete} className="btn btn-outline-danger">
          🗑️ Supprimer cette moto
        </button>
      </div>
    </div>
  );
};

export default MotoDetail;
