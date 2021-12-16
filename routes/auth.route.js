const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
  reviewUsuario,
} = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares/validar-campo");
const { validarJWT, revalidarToken } = require("../middlewares/validar-jwt");
const router = Router();

router.post(
  "/create",
  [
    check("nombre", "El campo nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio")
      .isString()
      .isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario
);

router.post("/login", loginUsuario);

router.post(
  "/review",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio")
      .isString()
      .isLength({ min: 6 }),
    validarJWT,
    revalidarToken,
  ],
  reviewUsuario
);

module.exports = router;
