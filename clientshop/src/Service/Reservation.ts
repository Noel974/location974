import axios from 'axios';

export interface ReservationRequest {
  vehicule: string;
  vehiculeType: 'Voiture' | 'Moto';
  dateDebut: string; // format ISO
  dateFin: string;   // format ISO
}

export interface ReservationResponse {
  _id: string;
  client: string;
  vehicule: string;
  vehiculeType: 'Voiture' | 'Moto';
  dateDebut: string;
  dateFin: string;
  prixTotal: number;
  statut: 'confirmée' | 'annulée' | 'terminée';
  dateReservation: string;
}

const RESERVATION_API = 'https://location974.onrender.com/api/reservations'; // adapte si besoin

// 🔐 Créer une réservation
export const createReservation = async (
  data: ReservationRequest
): Promise<ReservationResponse> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${RESERVATION_API}/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.reservation;
  } catch (error: any) {
    throw error.response?.data || { message: 'Erreur lors de la réservation.' };
  }
};

// 📥 Récupérer toutes les réservations du client
export const getMesReservations = async (): Promise<ReservationResponse[]> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${RESERVATION_API}/mes-reservations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.reservations;
  } catch (error: any) {
    throw error.response?.data || { message: 'Erreur lors du chargement des réservations.' };
  }
};
