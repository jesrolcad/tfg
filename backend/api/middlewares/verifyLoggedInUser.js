const jwt = require('jsonwebtoken');

module.exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) return res.status(401).json({ msg: "Not Authorized" });
    jwt.verify(token, process.env.SEED_AUTENTICACION, (err, user) => {
      if (err) return res.status(401).json({ msg: err });
      req.user = user;
      next();
    });
  };