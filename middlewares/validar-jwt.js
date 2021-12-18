const { response } = require("express");
const jwt = require("jsonwebtoken");
const { generarJWT } = require("../utils/jwt");
const User = require("../models/usuario");

const validarJWT = (req, res = response, next) => {
  const token = req.header("x-token");
  console.log(req.headers);
  if (!token) {
    return res.json({
      ok: false,
      msg: "Error en el AAtoken",
      token,
    });
  }
  try {
    const { uid, nombre } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.nombre = nombre;
    req.uid = uid;
  } catch (e) {
    console.log(e);
    res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }
  next();
};

const revalidarToken = async (req, res = response, next) => {
  const { uid, nombre, email } = req;
  token = await generarJWT(uid, nombre);
  const user = await User.findById(uid);
  console.log("AAAAA");
  return res.json({
    ok: true,
    msg: "Renew",
    uid,
    nombre,
    email: user.email,
    token,
  });
};

module.exports = {
  revalidarToken,
  validarJWT,
};
