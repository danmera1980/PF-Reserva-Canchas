const { Router } = require("express");
const userExtractor = require("../middleware/userExtractor");
const authGoogle = require("../middleware/auth");
const {
  getAllUsers,
  getUserProfile,
  registerUser,
  editUser,
  registerGoogle,
  getUserBookingHistory,
} = require("../controllers/user");
const { loginUser, checkedEmail } = require("../controllers/login");
const timeIp = require("../middleware/timeIp");

const router = Router();

router.get("/", timeIp, getAllUsers);
router.get("/checkedEmail", timeIp, checkedEmail);
router.get("/bookings", timeIp, userExtractor, authGoogle, getUserBookingHistory);

router.get("/profile", timeIp, userExtractor, authGoogle, getUserProfile);
router.post("/googleRegister", timeIp, userExtractor, authGoogle, registerGoogle);

router.post("/register", timeIp, registerUser);
router.post("/login", timeIp, loginUser);

router.put("/edit", timeIp, userExtractor, authGoogle, editUser);

module.exports = router;
