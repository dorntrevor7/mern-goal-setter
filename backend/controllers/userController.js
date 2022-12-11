const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const brcypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await brcypt.genSalt(10);
  const hashedPass = await brcypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPass,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error(`Invalid user data`);
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await brcypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error(`Invalid email or password`);
  }
});

const getUserData = asyncHandler(async (req, res, next) => {
  res.status(200).json(req.user);
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});

  if (!users) {
    res.status(404);
    throw new Error(`Users not found`);
  }

  res.status(200).json(users);
});

// generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  getAllUsers,
  loginUser,
  getUserData,
  generateToken,
};
