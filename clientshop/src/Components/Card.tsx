import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import type { Voiture } from '../Service/Api';

interface VoitureCardProps {
    voiture: Voiture;
}

const VoitureCard: React.FC<VoitureCardProps> = ({ voiture }) => {
    return (
        <div className="card m-3" style={{ width: '18rem' }}>
            {/* Affichage de l'image */}
<img src={`http://localhost:3100/image/${voiture.imageUrls[0].split('/').pop()}`} alt={voiture.modele} />
            <div className="card-body">
                <h5 className="card-title">{voiture.marque} {voiture.modele}</h5>
                <p className="card-text">Année: {voiture.annee}</p>
                <p className="card-text">Prix: {voiture.prixParJour}€</p>

                {/* Affichage du statut de disponibilité */}
                <p className={`badge ${voiture.disponible ? 'bg-success' : 'bg-danger'}`}>
                    {voiture.disponible ? 'Disponible' : 'Non disponible'}
                </p>
            </div>
        </div>
    );
};

export default VoitureCard;
