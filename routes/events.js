/*

    Rutas de eventos
    /api/events
*/
const { Router } = require("express");
const {
  getEvents,
  newEvent,
  updateEvent,
  delEvent,
} = require("../controller/events");
const { validateFields } = require("../middlewares/fields-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { isDate } = require("./../helpers/isDate");

const router = Router();
// cualquier petición de las rutas que esten debajos de la linea siguiente
// ejecutara antes el middleware espedificado
router.use(validarJWT);
// Obtener eventos, validar todas con el JWT
router.get("/", getEvents);

router.post(
  "/new",
  [
    check("title", "El titulo es obligatorio").notEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validateFields,
  ],
  newEvent
);

router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").notEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validateFields,
  ],
  updateEvent
);

router.delete("/:id", delEvent);

module.exports = router;
