const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");

router.use(
  cors({
    credentials: true,
    origin: "https://areness-role-manager-fe.onrender.com",
  })
);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);

module.exports = router;
