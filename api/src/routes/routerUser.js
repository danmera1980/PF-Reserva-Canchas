const { Router } = require("express");
const userExtractor = require("../middleware/userExtractor");
const authGoogle = require("../middleware/auth");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

const {
  getAllUsers,
  getUserProfile,
  registerUser,
  editUser,
  registerGoogle,
  getUserBookingHistory,
  updateStatus,
} = require("../controllers/user");
const { loginUser, checkedEmail } = require("../controllers/login");
const router = Router();

const registerSchema = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-Z\s]+$/)
    .min(1)
    .max(40)
    .required(),
  email: Joi.string()
    .regex(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),

  lastName: Joi.string()
    .regex(/^[a-zA-Z\s]+$/)
    .min(1)
    .max(40)
    .required(),
});
const loginSchema = Joi.object({
  email: Joi.string()
  .regex(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
  .required(),
  password: Joi.string().required(),

})



router.get("/", getAllUsers);
router.get("/checkedEmail", checkedEmail);
router.get("/bookings", userExtractor, authGoogle, getUserBookingHistory);

router.get("/profile", userExtractor, authGoogle, getUserProfile);
router.post("/googleRegister", userExtractor, authGoogle, registerGoogle);

router.post("/register", validator.body(registerSchema), registerUser);
router.post("/login", validator.body(loginSchema), loginUser);

router.put("/edit", userExtractor, authGoogle, editUser);
router.put("/updateStatus", userExtractor, authGoogle, updateStatus);



module.exports = router;
