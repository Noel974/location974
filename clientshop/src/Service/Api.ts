import axios from 'axios';

const API_URL = 'http://localhost:3100/api/voitures'; // Remplace par l'URL réelle de ton API

export interface Voiture {
    _id: string;
    marque: string;
    modele: string;
    annee: number;
    prixParJour: number;
    imageUrls: string;
    disponible: boolean;
}


export const getAllVoitures = async (page = 1, limit = 10): Promise<Voiture[]> => {
    try {
        const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des voitures :", error);
        return [];
    }
};

export const getVoitureById = async (id: string): Promise<Voiture | null> => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de la voiture :", error);
        return null;
    }
};
