import { useState } from 'react';
import { serviceCreateMoto } from '../Services/MotoService';

const Createmoto = () => {
  const [formData, setFormData] = useState({
    marque: '',
    modele: '',
    prixParJour: '',
    carburant: 'essence',
    boiteVitesse: 'manuelle',
    type: 'Standard',
    description: '',
  });

  const [photoPrincipale, setPhotoPrincipale] = useState<File | null>(null);
  const [autresPhotos, setAutresPhotos] = useState<FileList | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!photoPrincipale || !autresPhotos || autresPhotos.length !== 3) {
      alert('Une photo principale et exactement 3 autres photos sont requises.');
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append('photoPrincipale', photoPrincipale);
    Array.from(autresPhotos).forEach(photo => data.append('autresPhotos', photo));

    try {
      await serviceCreateMoto(data);
      alert('Moto créée avec succès !');
    } catch (err: any) {
      alert('Erreur : ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Ajouter une moto</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Marque</label>
            <input
              type="text"
              name="marque"
              className="form-control"
              placeholder="Marque"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Modèle</label>
            <input
              type="text"
              name="modele"
              className="form-control"
              placeholder="Modèle"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Prix par jour (€)</label>
          <input
            type="number"
            name="prixParJour"
            className="form-control"
            placeholder="Prix par jour"
            onChange={handleChange}
            required
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Carburant</label>
            <select name="carburant" className="form-select" onChange={handleChange}>
              <option value="essence">Essence</option>
              <option value="diesel">Diesel</option>
              <option value="électrique">Électrique</option>
              <option value="hybride">Hybride</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Boîte de vitesse</label>
            <select name="boiteVitesse" className="form-select" onChange={handleChange}>
              <option value="manuelle">Manuelle</option>
              <option value="automatique">Automatique</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Type</label>
            <select name="type" className="form-select" onChange={handleChange}>
              <option value="Standard">Standard</option>
              <option value="Sportif">Sportif</option>
              <option value="Touring">Touring</option>
              <option value="Custom">Custom</option>
              <option value="Hybride">Hybride</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            placeholder="Description"
            maxLength={500}
            rows={4}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Photo principale</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={e => setPhotoPrincipale(e.target.files?.[0] || null)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">3 autres photos</label>
          <input
            type="file"
            accept="image/*"
            multiple
            className="form-control"
            onChange={e => setAutresPhotos(e.target.files)}
            required
          />
          <small className="text-muted">Veuillez sélectionner exactement 3 photos.</small>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Créer la moto
        </button>
      </form>
    </div>
  );
};

export default Createmoto;
