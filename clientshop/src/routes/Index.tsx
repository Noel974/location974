import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Assurez-vous que `react-router-dom` est installé
import ConditionsPage from '../pages/Condition'; // Vérifiez que ce chemin est correct
import MentionsLegales from'../pages/Mention';
import FAQPage from '../pages/FAQ'
import Home from '../pages/Home'; // Vérifiez que ce chemin est correct

const Index: React.FC = () => {
  return (
    <Routes>
      {/* Route vers la page d'accueil */}
      <Route path="/" element={<Home />} />
      <Route path="/ConditionsPage/" element={<ConditionsPage />} />
      <Route path="/MentionsLegales/" element={<MentionsLegales/>}/>
      <Route path="/FAQPage" element={<FAQPage/>}/>
    </Routes>
  );
};

export default Index;