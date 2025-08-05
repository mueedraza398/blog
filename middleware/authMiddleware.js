const jwt = require('jsonwebtoken');

 const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
 
  if (!token) {
    return res.status(401).json({ message: 'Access token missing', success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info like id, email, etc.
    next();
  } catch (err) {
    console.error('JWT Error:', err);
    return res.status(403).json({ message: 'Invalid or expired token', success: false });
  }
};

module.exports = { verifyToken };
