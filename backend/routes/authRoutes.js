const express = require("express");
const router = express.Router();
const { loginUser, forgotPassword, verifyOTP, resetPassword, logout, verifySession, changePassword } = require("../controllers/authController.js");
const verifyToken = require("../middleware/verifyToken");

// POST /api/login
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/forgot-password/verify-otp", verifyOTP);
router.post("/forgot-password/reset-password", resetPassword);
router.post('/logout',logout);
router.get('/verify-session', verifySession);
router.post("/change-password", verifyToken, changePassword);
module.exports = router;
