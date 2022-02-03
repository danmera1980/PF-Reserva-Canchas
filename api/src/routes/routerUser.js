const { Router } = require("express");
const userExtractor = require("../middleware/userExtractor");
const authGoogle = require('../middleware/auth')
const {
  getAllUsers,
  getUserByID,
  registerUser,
  editUser,
} = require("../controllers/user");
const { loginUser } = require("../controllers/login");

const router = Router();

router.get("/", getAllUsers);

router.get("/:id",  getUserByID);
router.post("/register", registerUser);
router.post(
  "/login",
  loginUser
);


router.put(
  "/edit",
  userExtractor, authGoogle,
  editUser
);

module.exports = router;
