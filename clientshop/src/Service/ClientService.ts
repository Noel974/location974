import axios from 'axios';

// URL de base de l’API
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
  _id: string;
  idClient?: string;
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
  // tu peux ajouter d'autres champs selon ton schéma MongoDB
}

// --------------------
// Services
// --------------------

// Inscription du client
export const registerClient = async (clientData: ClientRegisterData): Promise<ClientProfile> => {
  try {
    const response = await axios.post(`${API_URL}register`, clientData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Erreur inconnue lors de l'inscription." };
  }
};

// Connexion du client
export const loginClient = async (
  credentials: LoginCredentials
): Promise<{ client: ClientProfile; token: string }>=>{
  try {
    const response = await axios.post(`${API_URL}login`, credentials);

    // Stocke le token et l'ID du client après connexion
const { token, client } = response.data;
localStorage.setItem('clientId', client.id);
localStorage.setItem('token', token);

return { token, client };

  } catch (error: any) {
    throw error.response?.data || { message: "Erreur inconnue lors de la connexion." };
  }
};


export const getClientProfile = async (): Promise<ClientProfile> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.client;
  } catch (error: any) {
    throw error.response?.data || { message: "Erreur lors de la récupération du profil client." };
  }
};

