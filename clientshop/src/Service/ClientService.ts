import axios from 'axios';

const API_URL = 'https://location974.onrender.com/api/'; // Vérifie l'URL backend

// Ajouter automatiquement le token (si tu utilises l'authentification JWT)
const authHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ Inscription du client
export const registerClient = async (clientData: {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  telephone?: string;
  adresse?: string;
  verificationIdentite: {
    documentType: 'CNI' | 'passport' | 'permis de conduire';
    documentUrl: string;
  };
}) => {
  const res = await axios.post(`${API_URL}/register`, clientData);
  // Sauvegarde du token reçu si besoin
  if (res.data?.token) {
    localStorage.setItem('token', res.data.token);
  }
  return res.data;
};

// ✅ Connexion du client
export const loginClient = async (credentials: {
  email: string;
  motDePasse: string;
}) => {
  const res = await axios.post(`${API_URL}/login`, credentials);
  if (res.data?.token) {
    localStorage.setItem('token', res.data.token);
  }
  return res.data;
};

// ✅ Récupérer le profil du client
export const getClientProfile = async () => {
  const res = await axios.get(`${API_URL}/me`, authHeader());
  return res.data;
};

// ✅ Mettre à jour le profil du client
export const updateClientProfile = async (updatedData: Partial<any>) => {
  const res = await axios.put(`${API_URL}/me`, updatedData, authHeader());
  return res.data;
};

// ✅ Récupérer l'historique des locations
export const getClientHistory = async () => {
  const res = await axios.get(`${API_URL}/me/historique`, authHeader());
  return res.data;
};

// ✅ Supprimer un client (admin uniquement)
export const deleteClient = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`, authHeader());
  return res.data;
};
