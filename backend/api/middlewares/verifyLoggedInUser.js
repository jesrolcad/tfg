const jwt = require('jsonwebtoken');

module.exports.authenticateToken = (req, res, next) => {
  const authHeader = req.header('authorization');

  //check token
  if (authHeader == null) {
    return res.status(401).json({ error: "Debes iniciar sesión en el sistema" });
  }

  //check validity
  try {
    const verified = jwt.verify(authHeader/*.split(" ")[1] //para probar en postman*/, process.env.SEED_AUTENTICACION);
    req.user = verified.usuario; //if verified the token will be decoded and the username of the user will be extracted and passed.
    next();

  } catch (e) {
    res.status(401).json({ error: "Token no válido" });
  }

};



