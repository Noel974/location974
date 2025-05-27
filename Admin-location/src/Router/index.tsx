import type { JSX } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";
import Motos from "../Pages/Moto";
import ListeEntretiens from "../Pages/Entretien";
import MotoCreate from "../Pages/MotoCreate";
import MotoDetailPage from "../Pages/MotoDetail";
import Voitures from "../Pages/Voiture";
import VoitureDetailPage from "../Pages/VoitureDetail";

import CreateVoiture from "../Pages/VoitureCreate";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { admin } = useAuth();
  return admin ? children : <Navigate to="/" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/voitures"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Voitures />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/motos"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Motos />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
            <Route
        path="/entretiens"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <ListeEntretiens />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/CreateVoiture"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <CreateVoiture />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/MotoCreate"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <MotoCreate />
            </DashboardLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/voitures/:id"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <VoitureDetailPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/moto/:id"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <MotoDetailPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
