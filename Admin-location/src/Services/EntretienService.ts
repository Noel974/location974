import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL;

export const serviceCreateEntretien = async (data: {
  idEntretien: string;
  idVehicule: string;
  typeVehicule: string;
  typeEntretien: string;
  dateEntretien: string;
  coût: number;
  commentaire?: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE}/entretien`, data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Erreur création entretien:", error.response?.data || error.message);
    throw new Error("Erreur lors de la création de l'entretien.");
  }
};


export const getEntretien = async () => {
  try {
    const res = await axios.get(`${API_BASE}/entretien`);
    return res.data;
  } catch (error) {
    console.error("❌ Erreur récupération entretiens:", error);
    throw new Error("Erreur lors de la récupération des entretiens.");
  }
};

export const getEntretienById = async (id: string) => {
  console.log("🔍 Récupération de l'entretien ID:", id);
  try {
    const res = await axios.get(`${API_BASE}/entretien/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Erreur récupération entretien ID ${id}:`, error);
    throw new Error("Erreur lors de la récupération de l'entretien.");
  }
};

export const updateEntretien = async (id: string, data: FormData) => {
  try {
    const response = await axios.put(`${API_BASE}/entretien/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(`❌ Erreur mise à jour entretien ID ${id}:`, error);
    throw new Error("Erreur lors de la mise à jour de l'entretien.");
  }
};

export const deleteEntretien = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE}/entretien/${id}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Erreur suppression entretien ID ${id}:`, error);
    throw new Error("Erreur lors de la suppression de l'entretien.");
  }
};
