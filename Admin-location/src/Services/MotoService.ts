import axios from 'axios';

const API_BASE = 'http://localhost:3100/api/moto';


export const getMotos = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const getMotoById = async (id: string) => {
  console.log("🔍 Récupération de la moto ID:", id); 
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
  
};


//Crud 

export const serviceCreateMoto = async (data: FormData) => {
  if (!data.has("idMoto")) {
    data.append("idMoto", new Date().getTime().toString()); // Génère un ID basé sur le timestamp
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
    throw new Error("Erreur lors de la création de la moto.");
  }
};

export const updateMoto = async (id: string, data: FormData) => {
  console.log("✏️ Mise à jour de la moto ID:", id);

  try {
    const response = await axios.put(`${API_BASE}/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la mise à jour de la moto.");
  }
};

export const deleteMotoById = async (id: string) => {
    console.log("🗑️ Suppression du véhicule avec l'id :", id);

    try {
        const res = await fetch(`${API_BASE}/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            throw new Error(`❌ Erreur lors de la suppression de la moto. Code: ${res.status}`);
        }

        console.log("✅ Moto supprimée avec succès !");
    } catch (error) {
        console.error("❌ Erreur DELETE:", error);
        throw error;
    }
};


