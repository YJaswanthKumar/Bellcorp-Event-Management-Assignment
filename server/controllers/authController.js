const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Register User
const registerUser = async (request, response) => {
  const { name, email, password } = request.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return response.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    response.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    response.status(500).json({ message: "Server Error" });
  }
};

// Login User
const loginUser = async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return response
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return response
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    response.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    response.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
