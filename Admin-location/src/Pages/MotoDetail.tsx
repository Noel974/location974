import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MotoDetail from "../Components/MotoDetail";
import { getMotoById } from "../Services/MotoService";

const motoDetailPage = () => {
  const { id } = useParams(); // Récupère l'ID dans l'URL
  const [moto, setMoto] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await getMotoById(id);
        setMoto(data);
      }
    };
    fetchData();
  }, [id]);

  if (!moto) {
    return <p>🔎 Chargement des détails...</p>;
  }


  return (
    <div className="moto-detail-page">
      <div className="moto-detail-content">
        <MotoDetail  moto={moto} onClose={() => window.history.back()} />
      </div>
    </div>
  );
};

export default motoDetailPage;
