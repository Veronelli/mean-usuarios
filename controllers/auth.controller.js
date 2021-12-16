const { response } = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const Usuario = require("./../models/usuario");
const jwt = require("./../utils/jwt");

const crearUsuario = async (req, res = response) => {
  const { email, nombre, password } = req.body;
  let token;
  try {
    const usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.json({
        menssage: "Usuario ya existente",
      });
    }

    const dbUser = new Usuario(req.body);

    //hashing de la contraseña pa
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password, salt);

    //Generar JWT
    token = await jwt.generarJWT(dbUser.id, dbUser.nombre);

    await dbUser.save();
  } catch (e) {
    console.log(e);
    return res
      .json({
        message: "Lol no se puede",
      })
      .status(500);
  }

  return res
    .json({
      menssage: `Usuario creado`,
      nombre,
      token,
    })
    .status(200);
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const dbUser = await Usuario.findOne({ email });
    if (!dbUser) {
      return res.json({
        ok: false,
        message: "Email incorrecto",
      });
    }
    console.log(dbUser);

    //Match password
    const validPassword = bcrypt.compareSync(password, dbUser.password);

    if (!validPassword) {
      return res.json({
        ok: false,
        message: "Password no existe",
      });
    }
    const token = await jwt.generarJWT(dbUser.id, dbUser.nombre);

    return res.json({
      ok: true,
      menssage: "Login Usuario",
      nombre: dbUser.nombre,
      token,
    });
  } catch (e) {
    console.log(e);
    return res
      .json({
        ok: false,
        message: "Hable con el admin",
      })
      .status(500);
  }
};

const reviewUsuario = (req, res = response) => {
  token = req.header("x-token");
  return res.json({
    menssage: "Review",
    token,
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  reviewUsuario,
};
