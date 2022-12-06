const asyncHandler = require("express-async-handler");

const Goal = require("../model/goalModel.js");
const User = require("../model/userModel.js");

const getGoals = asyncHandler(async (req, res, next) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

const postGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({ text: req.body.text, user: req.user.id });

  res.status(200).json(goal);
});

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error(`No Goal found, trying to update goal ${req.user.id}`);
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error(`No User found, trying to update goal ${req.user.id}`);
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error(`User not authorized to update goal id: ${req.params.id}`);
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  // res.status(200).json({ message: `Update Goal ${req.params.id}` });
  res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error(`No Goal found, trying to delete goal ${req.params.id}`);
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error(`No User found, trying to delete goal ${req.user.id}`);
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error(`User not authorized to delete goal ${user.id}`);
  }

  await Goal.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: `Goal ${goal.id} deleted` });
});

module.exports = {
  getGoals,
  postGoal,
  updateGoal,
  deleteGoal,
};
