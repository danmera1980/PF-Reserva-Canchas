const { Router } = require("express");
const router = Router();
const validator = require("express-joi-validation").createValidator({});
const Joi = require("joi");
const {
  getAllActiveEstablishmentsFromDB,
  createEstablishment,
  addUserToEstablishment,
  getEstabIdByUserId,
  getEstablishmentByUser,
  cuitInDb,
  establishmentBookings,
  statusUpdate
} = require("../controllers/establishment.js");
const userExtractor = require("../middleware/userExtractor");
const authGoogle = require("../middleware/auth");
const timeIp = require("../middleware/timeIp.js");

const bodySchema = Joi.object({
  cuit: Joi.string()
    .regex(/^[0-9]+$/)
    .required(),
  userId: Joi.number(),
  name: Joi.string()
    .regex(/^[a-zA-Z0-9 :]+$/)
    .min(1)
    .max(40)
    .required(),
  logoImage: Joi.string()
    .regex(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    )
    .min(8)
    .allow(""),
  timeActiveFrom: Joi.string()
    .regex(/^([0-9]{2})\:([0-9]{2})$/)
    .required(),
  timeActiveTo: Joi.string()
    .regex(/^([0-9]{2})\:([0-9]{2})$/)
    .required(),
});
router.get("/idUser",  timeIp, userExtractor, authGoogle, getEstablishmentByUser);
router.get('/userId', timeIp, userExtractor, authGoogle, getEstabIdByUserId )
router.get('/', timeIp, getAllActiveEstablishmentsFromDB)
router.get("/cuitInDb", timeIp, cuitInDb)
router.post(
  "/",
  timeIp,
  userExtractor,
  authGoogle,
  validator.body(bodySchema),
  createEstablishment
);
router.post("/addUserToEstablishment", timeIp, addUserToEstablishment);
router.put("/updateStatus", timeIp, userExtractor, authGoogle, statusUpdate);
module.exports = router;
