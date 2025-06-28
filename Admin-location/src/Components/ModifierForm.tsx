import { useState } from "react";

type Vehicle = {
  _id: string;
  marque: string;
  modele: string;
  prixParJour: number;
};

type Props = {
  vehicle: Vehicle;
  onClose: () => void;
  onUpdate: (id: string, data: FormData) => Promise<any>; // updateMoto ou updateVoiture
  type: "moto" | "voiture"; // juste pour info si besoin
};

const EditVehicleForm = ({ vehicle, onClose, onUpdate, type }: Props) => {
  const [marque, setMarque] = useState(vehicle.marque);
  const [modele, setModele] = useState(vehicle.modele);
  const [prixParJour, setPrixParJour] = useState(vehicle.prixParJour);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("marque", marque);
    formData.append("modele", modele);
    formData.append("prixParJour", prixParJour.toString());

    try {
      await onUpdate(vehicle._id, formData);
      alert(`✅ ${type === "moto" ? "Moto" : "Voitures"} mise à jour !`);
      onClose();
    } catch (err) {
      alert("❌ Erreur de mise à jour.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Marque</label>
        <input className="form-control" value={marque} onChange={(e) => setMarque(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Modèle</label>
        <input className="form-control" value={modele} onChange={(e) => setModele(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Prix par jour (€)</label>
        <input
          type="number"
          className="form-control"
          value={prixParJour}
          onChange={(e) => setPrixParJour(Number(e.target.value))}
        />
      </div>
      <button type="submit" className="btn btn-success">💾 Enregistrer</button>
    </form>
  );
};

export default EditVehicleForm;
