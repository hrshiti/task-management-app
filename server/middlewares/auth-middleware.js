const jwt = require('jsonwebtoken');
const User = require('../models/auth-model');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    req.user = user; 
    next(); 
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
