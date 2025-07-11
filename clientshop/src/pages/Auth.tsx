import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { type ClientRegisterData, loginClient, type LoginCredentials, registerClient } from '../Service/ClientService';

const AuthPage: React.FC = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const [registerData, setRegisterData] = useState<ClientRegisterData>({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
  });

  const [loginData, setLoginData] = useState<LoginCredentials>({
    email: '',
    motDePasse: '',
  });

const handleRegister = async () => {
  try {
    console.log("📤 Données envoyées pour inscription :", registerData);
    const res = await registerClient(registerData);
    console.log("✅ Réponse de l'API :", res);
    alert("Inscription réussie !");
    setIsRegisterMode(false); // bascule vers la connexion après inscription
  } catch (err: any) {
    console.error("❌ Erreur lors de l'inscription :", err);
    alert(err.message || "Erreur inconnue lors de l'inscription.");
  }
};

const handleLogin = async () => {
  try {
    const { client } = await loginClient(loginData);
    alert(`Connexion réussie, bon retour ${client.prenom} !`);
    localStorage.setItem('client', JSON.stringify(client));
    window.dispatchEvent(new Event('clientChanged'));

    // Vérifie si on est déjà sur la page voitureDetail
    const currentPath = window.location.pathname;
    if (!currentPath.includes('voitureDetail')) {
      window.location.href = '/'; // Redirige vers la page d'accueil
    }
  } catch (err: any) {
    alert(err.message || "Erreur pendant la connexion.");
  }
};


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: '360px' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">{isRegisterMode ? 'Inscription' : 'Connexion'}</h4>
          <button className="btn btn-outline-primary btn-sm" onClick={() => setIsRegisterMode(!isRegisterMode)} title="Changer de mode">
            <i className="bi bi-person-plus"></i>
          </button>
        </div>

        {isRegisterMode ? (
          <>
            <input type="text" className="form-control mb-2" placeholder="Nom"
              value={registerData.nom}
              onChange={(e) => setRegisterData({ ...registerData, nom: e.target.value })} />
            <input type="text" className="form-control mb-2" placeholder="Prénom"
              value={registerData.prenom}
              onChange={(e) => setRegisterData({ ...registerData, prenom: e.target.value })} />
            <input type="email" className="form-control mb-2" placeholder="Email"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} />
            <input type="password" className="form-control mb-3" placeholder="Mot de passe"
              value={registerData.motDePasse}
              onChange={(e) => setRegisterData({ ...registerData, motDePasse: e.target.value })} />
            <button className="btn btn-success w-100" onClick={handleRegister}>S'inscrire</button>
          </>
        ) : (
          <>
            <input type="email" className="form-control mb-2" placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
            <input type="password" className="form-control mb-3" placeholder="Mot de passe"
              value={loginData.motDePasse}
              onChange={(e) => setLoginData({ ...loginData, motDePasse: e.target.value })} />
            <button className="btn btn-primary w-100" onClick={handleLogin}>Se connecter</button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
