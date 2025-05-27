import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface motoCardProps { 
  moto: any; 
  onClick?: () => void; // optionnel si tu ne l'utilises pas ici
}

const MotoCard = ({ moto }: motoCardProps) => {
  const navigate = useNavigate();

    useEffect(() => {
    console.log("🖼️ URL de l'image principale:", moto.imageUrls?.[0]);
  }, [moto]);


  return (
    <div className="card moto-card mb-4" style={{ width: "18rem" }}>
<img 
  src={moto.imageUrls[0]} 
  className="card-img-top" 
  alt={moto.modele} 
  style={{ maxHeight: '200px', objectFit: 'cover' }}
  crossOrigin="anonymous"
/>
      <div className="card-body">
        <h5 className="card-title">{moto.modele}</h5>
        <p className="card-text">
          <strong>Type:</strong> {moto.boiteVitesse}
        </p>
        <button 
          className="btn btn-primary w-100" 
          onClick={() => navigate(`/moto/${moto._id}`)}
        >
          Voir les details
        </button>
      </div>
    </div>
  );
};

export default MotoCard;
