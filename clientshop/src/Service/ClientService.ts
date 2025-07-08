import axios from 'axios';

const API_URL = 'https://location974.onrender.com/api/clients/'; // Vérifie l'URL backend

// Inscription du client
export const registerClient = async (clientData: any) => {
  try {
    const response = await axios.post(`${API_URL}client/register`, clientData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue lors de l'inscription." };
  }
};

// Connexion du client
export const loginClient = async (credentials: any) => {
  try {
    const response = await axios.post(`${API_URL}client/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue lors de la connexion." };
  }
};

// Mise à jour du profil
export const updateClientProfile = async (clientId, updatedData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${clientId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur lors de la mise à jour du profil." };
  }
};
