const express = require("express");
const router = express.Router();

const {
  registerUser,
  getAllUsers,
  loginUser,
  getUserData,
} = require("../controllers/userController");

router.route("/").post(registerUser).get(getAllUsers);

router.post("/login", loginUser);

router.get("/me", getUserData);

module.exports = router;
