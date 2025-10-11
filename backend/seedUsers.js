const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const users = [
  { email: "khasim.22420109@viit.ac.in", password: "Pass@123" },
  { email: "rohit.22420186@viit.ac.in", password: "Pass@234" },
  { email: "faizanahemad.22420138@viit.ac.in", password: "Pass@345" },
  { email: "krushna.22420149@viit.ac.in", password: "Pass@456" },
  { email: "khasimpatel8767@gmail.com", password: "Pass@567" },
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Clear existing users (optional)
    await User.deleteMany({});

    for (let user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({ email: user.email, password: hashedPassword });
      console.log(`Inserted user: ${user.email}`);
    }

    console.log("All users inserted successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers();
