const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Format "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: "Accès refusé. Token manquant." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken.isAdmin) {
      return res.status(403).json({ message: "Accès interdit. Admin requis." });
    }

    next(); // Autorisation validée ✅
  } catch (error) {
    res.status(401).json({ message: "Authentification échouée." });
  }
};
