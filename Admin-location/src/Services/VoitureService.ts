import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

export const getVoitures = async () => {
  const res = await axios.get(`${API_BASE}/voitures`);
  return res.data;
};

export const getVoitureById = async (id: string) => {
  console.log("🔍 Récupération de la voiture ID:", id); 
  const res = await axios.get(`${API_BASE}/voitures/${id}`);
  return res.data;
};


export const serviceCreateVoiture = async (data: FormData) => {
  if (!data.has("idVoiture")) {
    data.append("idVoiture", new Date().getTime().toString()); // Génère un ID basé sur le timestamp
  }

  try {
    const response = await axios.post(
      (`${API_BASE}/voitures`),
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la création de la voiture.");
  }
};

export const updateVoiture = async (id: string, data: FormData) => {
  console.log("✏️ Mise à jour de la voiture ID:", id);

  try {
    const response = await axios.put(`https://location974.onrender.com/api/voitures/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la mise à jour de la voiture.");
  }
};