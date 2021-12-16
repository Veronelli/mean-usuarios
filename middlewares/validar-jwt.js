const { response } = require("express");
const jwt = require("jsonwebtoken");
const { generarJWT } = require("../utils/jwt");

const validarJWT = (req, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.json({
      ok: false,
      msg: "Error en el token",
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
    });git

const revalidarToken = async (req, res = response, next) => {
  const { uid, nombre } = req;
  token = await generarJWT(uid, nombre);
  console.log("AAAAA");
  return res.json({
    ok: true,
    msg: "Renew",
    uid,
    nombre,
    token,
  });
};

module.exports = {
  revalidarToken,
  validarJWT,
};
