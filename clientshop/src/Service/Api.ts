import axios from "axios";

const API_BASE_URL = "https://location974.onrender.com/api";

export interface Voiture {
  _id: string;
  marque: string;
  modele: string;
  annee: number;
  prixParJour: number;
  imageUrls: string;
  disponible: boolean;
}

// 🚗 Voitures
export const getAllVoitures = async (page = 1, limit = 10): Promise<Voiture[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/voitures?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des voitures :", error);
    return [];
  }
};

export const getVoitureById = async (id: string): Promise<Voiture | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/voitures/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la voiture :", error);
    return null;
  }
};

// 🏍️ Motos
export const getMotos = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/moto`);
    return res.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des motos :", error);
    return [];
  }
};

export const getMotoById = async (id: string) => {
  try {
    console.log("🔍 Récupération de la moto ID:", id);
    const res = await axios.get(`${API_BASE_URL}/moto/${id}`);
    return res.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la moto :", error);
    return null;
  }
};
