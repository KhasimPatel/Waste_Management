const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const transporter = require("../config/email.js");
const crypto = require("crypto");

// Login User
exports.loginUser = async (req, res) => {
  try {
    console.log("Req Body:", req.body); // check frontend data is coming or not

    const user = await User.findOne({ email: req.body.email });
    console.log("User from DB:", user); // check DB me user fetch or not

    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Forgot Password - Generate and Send OTP
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Step 1: Check user exists or not
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Step 2: Generate OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Step 3: Hash OTP before storing (for security)
    const hashedOTP = crypto.createHash("sha256").update(String(otp)).digest("hex");

    // Step 4: Save hashed OTP + expiry
    user.resetPasswordOTP = hashedOTP;
    user.resetPasswordExpires = Date.now() + 5 * 60 * 1000; // valid for 5 minutes
    await user.save();

    // Step 5: Send OTP email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "RecycLens - Password Reset OTP",
      html: `
        <h2>RecycLens Password Reset</h2>
        <p>Your OTP is: <b>${otp}</b></p>
        <p>It will expire in <b>5 minutes</b>.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent successfully to your email" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // 1️⃣ Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 2️⃣ Check if OTP exists and not expired
    if (!user.resetPasswordOTP || !user.resetPasswordExpires) {
      return res.status(400).json({ message: "No OTP found. Please request OTP first." });
    }

    if (Date.now() > user.resetPasswordExpires) {
      return res.status(400).json({ message: "OTP expired. Please request a new one." });
    }

    // 3️⃣ Hash received OTP and compare with stored hashed OTP
    const hashedOTP = crypto.createHash("sha256").update(String(otp)).digest("hex");
    if (hashedOTP !== user.resetPasswordOTP) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // 4️⃣ OTP correct → success response
    res.status(200).json({ message: "OTP verified successfully" });

    // Optional: Clear OTP after successful verification
    user.resetPasswordOTP = null;
    user.resetPasswordExpires = null;
    await user.save();

  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    // 1️⃣ Check passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 3️⃣ Hash new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // 4️⃣ Update password & clear OTP fields
    user.password = hashedPassword;
    user.resetPasswordOTP = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });

  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//logout user
exports.logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    return res.json({ success: true, message: 'Logged Out' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//verify session
exports.verifySession = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ valid: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.json({ valid: false });

    res.json({ valid: true, user: decoded });
  } catch {
    res.json({ valid: false });
  }
};

//change password 
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const admin = await User.findById(req.user.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Current password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();

    res.json({ message: "Password updated successfully !!" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Server error" });
  }
};
