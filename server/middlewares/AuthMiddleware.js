const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  //
  const accessToken = req.header("accessToken");
  //check user has a jwt
  if (!accessToken)
    return res.json({ error: "You must be logged in to do that" });

  try {
    const validToken = verify(accessToken, "accesstokensecret");
    if (validToken) {
      return next();
    }
  } catch (error) {
    return res.json({ Error: error });
  }
};

module.exports = {validateToken}