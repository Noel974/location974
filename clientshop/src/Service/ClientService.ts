import axios from 'axios';

// --------------------
// URL de base de l’API
// --------------------
const API_URL = 'https://location974.onrender.com/api/clients/client/';

// --------------------
// Interfaces TypeScript
// --------------------

export interface ClientRegisterData {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
}

export interface LoginCredentials {
  email: string;
  motDePasse: string;
}

export interface ClientProfile {
  id?: string;
  uuid: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  adresse?: string;
  dateInscription: string;
  systemeFidelite: {
    points: number;
    niveau: 'Bronze' | 'Argent' | 'Or' | 'Platine';
  };
  statutCompte: 'actif' | 'suspendu';
}

// --------------------
// Services
// --------------------

// ✅ Inscription
export const registerClient = async (
  clientData: ClientRegisterData
): Promise<ClientProfile> => {
  try {
    const response = await axios.post(`${API_URL}register`, clientData);
    return response.data.client;
  } catch (error: any) {
    throw error.response?.data || { message: "Erreur inconnue lors de l'inscription." };
  }
};

// ✅ Connexion
export const loginClient = async (
  credentials: LoginCredentials
): Promise<{ client: ClientProfile; token: string }> => {
  try {
    const response = await axios.post(`${API_URL}login`, credentials);
    const { token, client } = response.data;
    localStorage.setItem('clientId', client.id);
    localStorage.setItem('token', token);
    return { token, client };
  } catch (error: any) {
    throw error.response?.data || { message: "Erreur inconnue lors de la connexion." };
  }
};

// ✅ Récupération du profil
export const getClientProfile = async (): Promise<ClientProfile> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}update`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.client;
  } catch (error: any) {
    throw error.response?.data || { message: "Erreur lors de la récupération du profil client." };
  }
};

// ✅ Mise à jour du profil
export const updateClientProfile = async (
  updateData: Partial<ClientProfile & { motDePasse?: string }>
): Promise<ClientProfile> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}delete`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.client;
  } catch (error: any) {
    throw error.response?.data || { message: "Erreur lors de la mise à jour du profil." };
  }
};

// ✅ Suppression du compte client
export const deleteClientAccount = async (): Promise<{ message: string }> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // Nettoyage du localStorage après suppression
    localStorage.removeItem('token');
    localStorage.removeItem('clientId');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Erreur lors de la suppression du compte." };
  }
};
