const jwt = require("jsonwebtoken");
require("dotenv").config();

const generarJWT = (uid, nombre) => {
  const payload = { uid, nombre };
  return new Promise((res, rej) => {
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "24h",
      },
      (err, tk) => {
        if (err) {
          rej(err);
        } else {
          res(tk);
        }
      }
    );
  });
};

module.exports = { generarJWT };
