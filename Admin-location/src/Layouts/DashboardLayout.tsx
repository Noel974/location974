import type { ReactNode } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside className="bg-dark text-white p-4" style={{ width: '250px', height: '100vh' }}>
        <div className="mb-4">
          <h3>🚗 Ma Société</h3>
          <p>{admin?.nom} {admin?.prenom}</p>
          <p>{new Date().toLocaleString()}</p>
        </div>
        <ul className="list-unstyled">
          <li>
            <Link to="/dashboard" className="text-white text-decoration-none d-block py-2">🏠 Dashboard</Link>
          </li>
          <li>
            <Link to="/voitures" className="text-white text-decoration-none d-block py-2">🚘 Voitures</Link>
          </li>
          <li>
            <Link to="/motos" className="text-white text-decoration-none d-block py-2">🏍️ Motos</Link>
          </li>
          {/* Ajoute ici d'autres liens */}
          <li
            style={{ marginTop: '2rem', cursor: 'pointer' }}
            onClick={handleLogout}
            className="text-danger d-block py-2"
          >
            🔓 Déconnexion
          </li>
        </ul>
      </aside>

      {/* Content */}
      <main className="flex-grow-1 p-4">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
