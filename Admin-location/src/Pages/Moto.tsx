import { useEffect, useState } from "react";
import HeaderSection from "../Components/Header";
import MotoCard from "../Components/MotoCard";
import { getMotos } from "../Services/MotoService";

const MotosPage = () => {
  const [motos, setMotos] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMotos();
      setMotos(Array.isArray(data) ? data : []);
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      {/* En-tête */}
      <HeaderSection
        title="Nos motos disponibles"
        imageSrc="/images/moto.jpeg"
        createPath="/MotoCreate"
      />

      {/* Grid de motos avec Bootstrap */}
      <div className="row d-flex flex-wrap justify-content-center mt-4">
        {motos.length === 0 ? (
          <div className="text-center mt-5">
            <p className="text-muted">Aucune moto disponible.</p>
          </div>
        ) : (
          motos.map((moto) => (
            <div key={moto._id} className="col-md-4 d-flex justify-content-center mb-4">
              <MotoCard moto={moto} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MotosPage;
