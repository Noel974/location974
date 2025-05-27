import React, { useEffect, useState } from 'react';
import { getAllVoitures, type Voiture } from '../Service/Api';
import VoitureCard from './Card';

const VoitureList: React.FC = () => {
    const [voitures, setVoitures] = useState<Voiture[]>([]);

    useEffect(() => {
        async function fetchVoitures() {
            const data = await getAllVoitures();
            setVoitures(data);
        }
        fetchVoitures();
    }, []);

    return (
        <div className="container">
            <h2 className="mt-4">Liste des Voitures</h2>
            <div className="row">
                {voitures.map(voiture => (
                    <div className="col-md-4" key={voiture._id}>
                        <VoitureCard voiture={voiture} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VoitureList;
