import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Assurez-vous que `react-router-dom` est installé
import ConditionsPage from '../pages/Condition'; // Vérifiez que ce chemin est correct
import FAQPage from '../pages/FAQ';
import Home from '../pages/Home'; // Vérifiez que ce chemin est correct
import MentionsLegales from '../pages/Mention';
import Voiture from '../pages/Voiture';
import Moto from '../pages/Moto';
import VoitureDetailPage from '../pages/VoitureDetailsP';
import MotoDetailPage from '../pages/MotoDetailsP';
import ProfilPage from '../pages/Profil';

const Index: React.FC = () => {
  return (
    <Routes>
      {/* Route vers la page d'accueil */}
      <Route path="/" element={<Home />} />
      <Route path="/Voiture" element={<Voiture/>}/>
      <Route path="/Moto" element={<Moto/>}/>
      <Route path="/Moto/:id" element={<MotoDetailPage/>}/>
      <Route path="/voitures/:id" element={<VoitureDetailPage />} />
      <Route path="/ConditionsPage/" element={<ConditionsPage />} />
      <Route path="/MentionsLegales/" element={<MentionsLegales/>}/>
      <Route path="/FAQPage" element={<FAQPage/>}/>
      <Route path ="/Profil/:id" element={<ProfilPage/>}/>
    </Routes>
  );
};

export default Index;