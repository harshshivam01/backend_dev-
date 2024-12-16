const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/authuser");
const {registerUser,loginUser, getUsers, getUserById, updateUser, deleteUser} = require("../controllers/usercont");

router.post("/signup", registerUser);
router.post("/login", loginUser);
// router.get("/", getUsers);
// router.get("/:id", getUserById);
// router.patch("/:id", updateUser);
// router.delete("/:id", deleteUser);

module.exports = router;    