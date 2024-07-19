/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/fields-validator");
const router = Router();
const {
  getAuths,
  revalToken,
  createAuth,
  LoginAuth,
} = require("../controller/auth");
const { validarJWT } = require("../middlewares/validar-jwt");

// Crear ruta de respuesta. Cuando se llame al servidor (localhost:4000 o localhost:4000/)
// se obtendrá la respuesta { OK: true }
router.get("/auths", getAuths);

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "El email no tiene un formato correcto").isEmail(),
    check(
      "password",
      "El password debe de ser de minimo 6 caracteres"
    ).isLength({ min: 6 }),
    validateFields,
  ],
  createAuth
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "El email no tiene un formato correcto").isEmail(),
    check(
      "password",
      "El password debe de ser de minimo 6 caracteres"
    ).isLength({ min: 6 }),
    validateFields,
  ],
  LoginAuth
);

router.get("/renew", validarJWT, revalToken);

module.exports = router;
