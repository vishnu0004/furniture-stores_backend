const jwt = require('jsonwebtoken');

const accessSecret = process.env.JWT_SECRET || 'access-secret-key';
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'refresh-secret-key';

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id }, accessSecret, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id }, refreshSecret, { expiresIn: '7d' });
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, accessSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); // ✅ allow to continue
  });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken
};
