import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Liste des cartes de navigation
const cards = [
  { title: "Voitures", path: "/voitures"},
  { title: "Motos", path: "/motos"},
  { title: "Clients", path: "/clients" },
  { title: "Sinistres", path: "/sinistres" },
  { title: "Pénalités", path: "/penalites" },
  { title: "Réservations", path: "/reservations" },
  { title: "Entretiens", path: "/entretiens" },
  { title: "Chart", path: "/Chart" },
];


// Composant de carte statistique
const StatCard = ({ title, available, rented }: { title: string; available: number; rented: number; icon: string }) => (
  <div className="card shadow text-center p-3">
    <h5 className="fw-bold">{title}</h5>
    <div className="d-flex justify-content-around mt-3">
      <div className="text-success">
        <i className="bi-check-circle-fill me-1"></i> Disponible : <strong>{available}</strong>
      </div>
      <div className="text-danger">
        <i className="bi-exclamation-circle-fill me-1"></i> Loué : <strong>{rented}</strong>
      </div>
    </div>
  </div>
);

const StatCards = ({ title, value }: { title: string; value: number | string; icon: string }) => (
  <div className="card shadow text-center p-3">
    <h5 className="fw-bold">{title}</h5>
    <p className="fs-2 text-success">{value} €</p>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
    const [chiffreAffaire, setChiffreAffaire] = useState(0);
  const [voitures, setVoitures] = useState({ available: 0, rented: 0 });
  const [motos, setMotos] = useState({ available: 0, rented: 0 });

  // Récupérer les statistiques en temps réel
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("https://location974.onrender.com/api/dashboard"); // API fictive
        setChiffreAffaire(res.data.chiffreAffaire);
        setVoitures({ available: res.data.voituresDispo, rented: res.data.voituresLouees });
        setMotos({ available: res.data.motosDispo, rented: res.data.motosLouees });
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Bienvenue sur le tableau de bord 📊</h2>

      {/* 📊 Cartes Statistiques */}
      <div className="row g-4 mb-4">
                <div className="col-md-6">
          <StatCards title="Chiffre d'Affaire (€)" value={chiffreAffaire} icon="bi-currency-euro" />
        </div>
        <div className="col-md-6">
          <StatCard title="Voitures 🚗" available={voitures.available} rented={voitures.rented} icon="bi-car-front-fill" />
        </div>
        <div className="col-md-6">
          <StatCard title="Motos 🏍️" available={motos.available} rented={motos.rented} icon="bi-bicycle" />
        </div>
      </div>

      {/* 🏠 Cartes de navigation */}
     <div className="row g-4">
  {cards.map((card) => (
    <div key={card.title} className="col-12 col-sm-6 col-md-4">
      <div
        className="card text-white bg-dark h-100 shadow"
        role="button"
        onClick={() => navigate(card.path)}
        style={{ cursor: "pointer" }}
      >
        <div className="card-body d-flex flex-column align-items-center justify-content-center">
          <i className={`bi ${card}`} style={{ fontSize: "2rem", marginBottom: "10px" }}></i>
          <h5 className="card-title text-center m-0">{card.title}</h5>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Dashboard;
