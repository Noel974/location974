import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:3100/api/entretien';

export interface EntretienData {
  idVehicule: string;
  typeVehicule: 'voiture' | 'moto';
  typeEntretien: string;
  dateEntretien: string;
  coût: number;
  commentaire?: string;
}

export interface Entretien extends EntretienData {
  _id: string;
  idEntretien: string;
}

const EntretienService = {
  // Ajouter un entretien
  createEntretien: async (data: FormData): Promise<Entretien> => {
    try {
      const response = await axios.post<Entretien>(API_URL, data, {
        withCredentials: true, // retire si tu n'utilises pas de cookies d'auth
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error("Erreur lors de l'ajout de l'entretien :", err.message);
      throw err;
    }
  },

  // Récupérer tous les entretiens
  getEntretiens: async (): Promise<Entretien[]> => {
    try {
      const response = await axios.get<Entretien[]>(API_URL);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error("Erreur lors de la récupération des entretiens :", err.message);
      throw err;
    }
  },

  // Modifier un entretien (optionnel)
  updateEntretien: async (id: string, data: Partial<EntretienData>): Promise<Entretien> => {
    try {
      const response = await axios.put<Entretien>(`${API_URL}/${id}`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error("Erreur lors de la modification de l'entretien :", err.message);
      throw err;
    }
  },

  // Supprimer un entretien (optionnel)
  deleteEntretien: async (id: string): Promise<{ message: string }> => {
    try {
      const response = await axios.delete<{ message: string }>(`${API_URL}/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error("Erreur lors de la suppression de l'entretien :", err.message);
      throw err;
    }
  },
};

export default EntretienService;
