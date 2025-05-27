import axios, { type AxiosResponse } from 'axios';

const API_URL =  import.meta.env.VITE_API_URL;

type VehiculeType = 'voiture' | 'moto' | string; // Tu peux remplacer ou élargir selon les types supportés
type ID = string | number;
type FormDataOrObject = FormData | Record<string, any>; // selon comment tu gères le "data"

// 🔸 Upload avec fichiers
const createVehicule = async (
  type: VehiculeType,
  data: FormDataOrObject
): Promise<AxiosResponse> => {
  return await axios.post(`${API_URL}/${type}s`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const updateVehicule = async (
  type: VehiculeType,
  id: ID,
  data: FormDataOrObject
): Promise<AxiosResponse> => {
  return await axios.put(`${API_URL}/${type}s/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const deleteVehicule = async (
  type: VehiculeType,
  id: ID
): Promise<AxiosResponse> => {
  return await axios.delete(`${API_URL}/${type}s/${id}`);
};

const getVehicule = async (
  type: VehiculeType,
  id: ID
): Promise<AxiosResponse> => {
  return await axios.get(`${API_URL}/${type}s/${id}`);
};

const vehiculeService = {
  createVehicule,
  updateVehicule,
  deleteVehicule,
  getVehicule,
};

export default vehiculeService;
