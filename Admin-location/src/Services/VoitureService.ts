import axios from 'axios';

const API_BASE = 'http://localhost:3100/api/voitures';

export const getVoitures = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const getVoitureById = async (id: string) => {
  console.log("🔍 Récupération de la voiture ID:", id); 
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};


export const serviceCreateVoiture = async (data: FormData) => {
  if (!data.has("idVoiture")) {
    data.append("idVoiture", new Date().getTime().toString()); // Génère un ID basé sur le timestamp
  }

  try {
    const response = await axios.post(
      API_BASE,
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

