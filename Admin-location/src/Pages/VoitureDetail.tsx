import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVoitureById } from "../Services/VoitureService";
import VoitureDetail from "../Components/VoitureDetail";

const VoitureDetailPage = () => {
  const { id } = useParams(); // Récupère l'ID dans l'URL
  const [voiture, setVoiture] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await getVoitureById(id);
        setVoiture(data);
      }
    };
    fetchData();
  }, [id]);

  if (!voiture) {
    return <p>🔎 Chargement des détails...</p>;
  }

  return (
    <div className="voiture-detail-page">
      <div className="voiture-detail-content">
        <VoitureDetail voiture={voiture} onClose={() => window.history.back()} />
      </div>
    </div>
  );
};

export default VoitureDetailPage;
