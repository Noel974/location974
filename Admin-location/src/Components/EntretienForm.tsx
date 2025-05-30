// components/EntretienForm.tsx
import React, { useState } from 'react';
import { serviceCreateEntretien } from '../Services/EntretienService';

interface Props {
  voiture?: { _id: string; marque: string; modele: string };
  moto?: { _id: string; marque: string; modele: string };
  onClose: () => void;
}

const EntretienForm: React.FC<Props> = ({ voiture, moto, onClose }) => {
  const [form, setForm] = useState({
    typeEntretien: 'vidange',
    dateEntretien: '',
    coût: '',
    commentaire: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await serviceCreateEntretien({
        idEntretien: new Date().getTime().toString(),
        idVehicule: voiture?._id || moto?._id, 
        typeVehicule: voiture ? 'voiture' : 'moto', 
        typeEntretien: form.typeEntretien,
        dateEntretien: form.dateEntretien,
        coût: Number(form.coût),
        commentaire: form.commentaire,
      });

      alert('✅ Entretien enregistré avec succès !');
      onClose();
    } catch (err) {
      alert('❌ Une erreur est survenue lors de l\'enregistrement de l\'entretien.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="entretien-form">
      <h4>🔧 Ajouter un entretien pour {voiture?.marque || moto?.marque} {voiture?.modele || moto?.modele}</h4>

      <label>Type d'entretien</label>
      <select name="typeEntretien" value={form.typeEntretien} onChange={handleChange}>
        <option value="vidange">Vidange</option>
        <option value="freins">Freins</option>
        <option value="pneus">Pneus</option>
        <option value="autre">Autre</option>
      </select>

      <label>Date</label>
      <input type="date" name="dateEntretien" value={form.dateEntretien} onChange={handleChange} required />

      <label>Coût (€)</label>
      <input type="number" name="coût" value={form.coût} onChange={handleChange} required />

      <label>Commentaire</label>
      <textarea name="commentaire" value={form.commentaire} onChange={handleChange} rows={3} />

      <div className="mt-3 d-flex gap-2">
        <button type="submit" className="btn btn-primary">💾 Enregistrer</button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>❌ Annuler</button>
      </div>
    </form>
  );
};

export default EntretienForm;
