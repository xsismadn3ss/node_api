const express = require("express");

const {
  register,
  login,
  logout,
  refreshAccessToken,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
routes.post("/refresh-token", refreshAccessToken);

module.exports = router;
