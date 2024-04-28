const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
  // pasar el token en las headers: x-token
  const token = req.header("x-token");
  console.log(token);
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Fallo en autenticación del usuario.",
    });
  }
  console.log(req.uid, req.name, process.env.SECRET_JWT_SEED);
  try {
    // se obtiene el payload que se paso en la creacion del JWT
    const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.uid = payload.uid;
    req.name = payload.name;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Token no valido.",
    });
  }

  next();
};

module.exports = {
  validarJWT,
};
