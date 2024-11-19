const jwr = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header["authorization"]?.slpli("")[1];

  if (!token) {
    return res.status(401).json({
      message: "Acceso denegado, el token no fue proporcionado",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "El token no es valido",
    });
  }
};

module.exports = authMiddleware;
