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

const router = Router();

router.get("/", getAllUsers);
router.get("/checkedEmail", checkedEmail);
router.get("/bookings", userExtractor, authGoogle, getUserBookingHistory);

router.get("/profile", userExtractor, authGoogle, getUserProfile);
router.post("/googleRegister", userExtractor, authGoogle, registerGoogle);

router.post("/register", registerUser);
router.post("/login", loginUser);

router.put("/edit", userExtractor, authGoogle, editUser);

module.exports = router;
