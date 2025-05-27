import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface motoCardProps { 
  voiture: any; 
  onClick?: () => void; // optionnel si tu ne l'utilises pas ici
}

const VoitureCard = ({ voiture }: motoCardProps) => {
  const navigate = useNavigate();

    useEffect(() => {
    console.log("🖼️ URL de l'image principale:", voiture.imageUrls?.[0]);
  }, [voiture]);


  return (
    <div className="card moto-card mb-4" style={{ width: "18rem" }}>
<img 
  src={voiture.imageUrls[0]} 
  className="card-img-top" 
  alt={voiture.modele} 
  style={{ maxHeight: '200px', objectFit: 'cover' }}
  crossOrigin="anonymous"
/>
      <div className="card-body">
        <h5 className="card-title">{voiture.modele}</h5>
        <p className="card-text">
          <strong>Type:</strong> {voiture.boiteVitesse}
        </p>
        <button 
          className="btn btn-primary w-100" 
          onClick={() => navigate(`/voitures/${voiture._id}`)}
        >
          Voir les details
        </button>
      </div>
    </div>
  );
};

export default VoitureCard;
