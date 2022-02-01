const { Router } = require("express");

const {
  getAllUsers,
  getUserByID,
  registerUser,
} = require("../controllers/user");
const { loginUser } = require("../controllers/login");

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserByID);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
