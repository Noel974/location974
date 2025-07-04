import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMotoById } from "../Service/Api";
import MotoDetail from "../Components/MotoDetail";


const MotoDetailPage = () => {
  const { id } = useParams(); // Récupère l'ID dans l'URL
  const [Moto, setMoto] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await getMotoById(id);
        setMoto(data);
      }
    };
    fetchData();
  }, [id]);

  if (!Moto) {
    return <p>🔎 Chargement des détails...</p>;
  }

  return (
    <div className="Moto-detail-page">
      <div className="Moto-detail-content">
        <MotoDetail Moto={Moto} onClose={() => window.history.back()} />
      </div>
    </div>
  );
};

export default MotoDetailPage;
