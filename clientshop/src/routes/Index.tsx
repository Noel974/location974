import AuthPage from '../pages/Auth';
import ConditionsPage from '../pages/Condition';
import ConfirPage from '../pages/Confir';
import FAQPage from '../pages/FAQ';
import Home from '../pages/Home';
import MentionsLegales from '../pages/Mention';
import Moto from '../pages/Moto';
import MotoDetailPage from '../pages/MotoDetailsP';
import ProfilPage from '../pages/Profil';
import Voiture from '../pages/Voiture';
import VoitureDetailPage from '../pages/VoitureDetailsP';



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
      {path: 'Auth', element:<AuthPage/>},
      {path:'Confir', element:<ConfirPage/>},
      { path: 'Voiture', element: <Voiture /> },
      { path: 'Voitures/:id', element: <VoitureDetailPage /> },
      { path: 'Moto', element: <Moto /> },
      {path:'Moto/:id',element:<MotoDetailPage/>},
    ],
  },
]);

