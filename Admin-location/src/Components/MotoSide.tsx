import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <button className="create-btn" onClick={() => navigate('/MotoCreate')}>Créer une voiture</button>
    </div>
  );
};

export default Sidebar;
