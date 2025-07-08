const Admin = require('../models/Admin');
const Client = require('../models/Client');
const Employe = require('../models/Employe');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(404).json({ message: "Admin introuvable" });

  // Vérification de l'expiration du mot de passe
  if (admin.dateExpiration && new Date() > admin.dateExpiration) {
    return res.status(403).json({ message: "Mot de passe expiré, veuillez le modifier." });
  }

  const valid = await bcrypt.compare(password, admin.motDePasse);
  if (!valid) return res.status(401).json({ message: "Mot de passe incorrect" });

  const token = jwt.sign(
    { id: admin._id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    token,
    admin: {
      nom: admin.nom,
      prenom: admin.prenom,
      posteOccupe: admin.posteOccupe
    }
  });
};

exports.loginEmploye = async (req, res) => {
    try {
        const { email, motDePasse } = req.body;

        if (!email || !motDePasse) {
            return res.status(400).json({ message: "Email et mot de passe requis." });
        }

        // Vérifier si l'employé existe
        const employe = await Employe.findOne({ email });
        if (!employe) {
            return res.status(401).json({ message: "Identifiants invalides." });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(motDePasse, employe.motDePasse);
        if (!isMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect." });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: employe._id, role: 'employe' }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({ message: "Connexion réussie !", token, employe });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la connexion.", error: error.message });
    }
};

//client
exports.registerClient = async (req, res) => {
  try {
      const { nom, prenom, email, motDePasse} = req.body;

      if (!nom || !prenom || !email || !motDePasse) {
          return res.status(400).json({ message: "Tous les champs requis doivent être fournis." });
      }

      // Vérifier si l'email est déjà utilisé
      const existingClient = await Client.findOne({ email });
      if (existingClient) {
          return res.status(400).json({ message: "Cet email est déjà utilisé." });
      }

      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(motDePasse, 10);

      // Créer le client
      const client = await Client.create({
          nom,
          prenom,
          email,
          motDePasse: hashedPassword,
      });

      res.status(201).json({ message: "Inscription réussie !", client });
  } catch (error) {
      res.status(500).json({ message: "Erreur lors de l'inscription.", error: error.message });
  }
};

exports.loginClient = async (req, res) => {
  try {
      const { email, motDePasse } = req.body;

      if (!email || !motDePasse) {
          return res.status(400).json({ message: "Email et mot de passe requis." });
      }

      // Vérifier si le client existe
      const client = await Client.findOne({ email });
      if (!client) {
          return res.status(401).json({ message: "Identifiants invalides." });
      }

      // Vérifier le mot de passe
      const isMatch = await bcrypt.compare(motDePasse, client.motDePasse);
      if (!isMatch) {
          return res.status(401).json({ message: "Mot de passe incorrect." });
      }

      // Générer un token JWT
      const token = jwt.sign({ id: client._id, role: 'client' }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.status(200).json({ message: "Connexion réussie !", token });
  } catch (error) {
      res.status(500).json({ message: "Erreur lors de la connexion.", error: error.message });
  }
};