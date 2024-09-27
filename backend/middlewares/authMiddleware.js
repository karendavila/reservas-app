const jwt = require('jsonwebtoken');
require('dotenv').config();

function protect(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: 'No autorizado, token no encontrado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Agregar el usuario decodificado al request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token no válido' });
  }
}

module.exports = protect;
