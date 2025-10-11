const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordOTP: { type: String },
  resetPasswordExpires: { type: Date },
  resetPasswordOTP: { type: String },
  resetPasswordExpires: { type: Date },

});

module.exports = mongoose.model("User", userSchema, "users");
