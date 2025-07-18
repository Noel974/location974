const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou invalide.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // On récupère { id, role }
    next();
} catch (err) {
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token expiré.' });
  }
  res.status(403).json({ message: 'Token invalide.' });
}

};

