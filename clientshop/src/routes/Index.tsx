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



// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/MainLayout';



export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {path: 'ConditionsPage', element:<ConditionsPage/>},
      {path: 'MentionsLegales',element:<MentionsLegales/>},
      {path: 'FAQPage',element:<FAQPage/>},
      {path: 'Profil',element:<ProfilPage/>},
      { path: 'Voiture', element: <Voiture /> },
      { path: 'Voitures/:id', element: <VoitureDetailPage /> },
      { path: 'Moto', element: <Moto /> },
      {path:'Moto/:id',element:<MotoDetailPage/>},
    ],
  },
]);

