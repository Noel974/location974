import { useNavigate } from 'react-router-dom';

interface HeaderSectionProps {
  title: string;         // Ex: "Nos voitures disponibles"
  imageSrc: string;      // URL de l'image
  createPath: string;    // Chemin de redirection (ex: "/CreateVoiture")
}

const HeaderSection = ({ title, imageSrc, createPath }: HeaderSectionProps) => {
  const navigate = useNavigate();

  // On extrait le mot après "Nos" ou autre, pour "Ajouter X"
  const label = title.split(" ")[1] || "élément";

  return (
    <div className="container my-4">
      <div className="row align-items-center">
        <div className="col-md-6 text-center text-md-start">
          <h1 className="mb-3">{title}</h1>
          <button 
            className="btn btn-primary"
            onClick={() => navigate(createPath)}
          >
            Ajouter {label}
          </button>
        </div>
        <div className="col-md-6 text-center">
          <img 
            src={imageSrc} 
            alt={title} 
            className="img-fluid rounded shadow"
            style={{ maxHeight: '250px', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
