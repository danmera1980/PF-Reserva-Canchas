const { Router } = require("express");

const {
  getAllUsers,
  getUserByID,
  registerUser,
  editUser
} = require("../controllers/user");
const { loginUser } = require("../controllers/login");

const router = Router();

router.get("/", getAllUsers);

router.get("/:id", getUserByID);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/edit", editUser);




module.exports = router;
