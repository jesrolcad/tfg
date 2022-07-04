const jwt = require('jsonwebtoken');

module.exports.authenticateToken = (req, res, next) => {
  const authHeader = req.header('authorization');
  console.log(authHeader);

  //check token
  if (authHeader == null) {
    return res.status(401).json({ error: "Access-denied" });
  }

  //check validity
  try {
    const verified = jwt.verify(authHeader, process.env.SEED_AUTENTICACION);
    console.log(verified);
    req.user = verified.usuario; //if verified the token will be decoded and the username of the user will be extracted and passed.
    next();

  } catch (e) {
    res.status(401).json({ error: "Invalid-token" });
  }

};



