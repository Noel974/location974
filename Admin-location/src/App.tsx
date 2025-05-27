
import './App.css';
import { AuthProvider } from './Context/AuthContext';
import AppRoutes from './Router';

function App() {
  return (
    <AuthProvider>

        <AppRoutes />

    </AuthProvider>
  );
}

export default App;
