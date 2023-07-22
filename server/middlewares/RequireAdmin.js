// The middleware to protect routes that are admin only

const { verify } = require('jsonwebtoken');

const requireAdmin = (req, res, next) => {
  const accessToken = req.header('accessToken');
  if (!accessToken) {
    return res.json({ error: 'You must be logged in to do that' });
  }

  try {
    const decodedToken = verify(accessToken, 'accesstokensecret');

    // Check if the user has admin role (is_admin: true) in the token's payload.
    if (!decodedToken.is_admin) {
      return res.json({ error: 'Unauthorized. You need admin privileges to access this page.' });
    }

    // If the user is an admin, proceed to the next middleware or the route handler.
    
    req.userData = decodedToken;
    next();
  } catch (error) {
    return res.json({ error: 'Invalid or expired access token.' });
  }
};

module.exports = {requireAdmin};
