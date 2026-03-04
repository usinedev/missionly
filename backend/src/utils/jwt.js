const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'nexus_secret_key_change_in_production';

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '30d';

const generateToken = (user) => {
  const payload = {
    id: user._id || user.id,
    email: user.email,
    username: user.username
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};

const generateRefreshToken = (user) => {
  const payload = {
    id: user._id || user.id,
    type: 'refresh'
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expiré');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Token invalide');
    }
    throw error;
  }
};

const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
  generateToken,
  generateRefreshToken,
  verifyToken,
  decodeToken
};
