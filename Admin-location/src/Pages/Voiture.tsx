import { useEffect, useState } from "react";
import HeaderSection from "../Components/Header";
import VoitureCard from "../Components/VoitureCard";
import { getVoitures } from "../Services/VoitureService";

const Voitures = () => {
  const [voitures, setVoitures] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getVoitures();
      setVoitures(Array.isArray(data) ? data : []);
    };
    fetchData();
  }, []);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const voituresPerPage = 6;
  const indexOfLastVoiture = currentPage * voituresPerPage;
  const indexOfFirstVoiture = indexOfLastVoiture - voituresPerPage;
  const currentVoitures = voitures.slice(
    indexOfFirstVoiture,
    indexOfLastVoiture
  );
  const totalPages = Math.ceil(voitures.length / voituresPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-4">
      <HeaderSection
        title="Nos voitures disponibles"
        imageSrc="/images/voiture.png"
        createPath="/CreateVoiture"
      />

      <div className="row d-flex flex-wrap justify-content-center">
        {currentVoitures.length === 0 ? (
          <div className="text-center mt-5">
            <p className="text-muted">Aucune Voiture disponible.</p>
          </div>
        ) : (
          currentVoitures.map((voiture) => (
            <div
              key={voiture._id}
              className="col-md-4 d-flex justify-content-center mb-4"
            >
              <VoitureCard voiture={voiture} />
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};
export default Voitures;
