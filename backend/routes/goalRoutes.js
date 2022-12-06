const express = require("express");
const router = express.Router();
const {
  getGoals,
  postGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");

// get all goals at /api/goals
// post/ create new goal at /api/goals
router.route("/").get(protect, getGoals).post(protect, postGoal);

// update specific goal by id at /api/goals/:id
// delete specific goal at /api/goals/:id
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

// router.get("/", getGoals);

// router.post("/", postGoal);

// router.put("/:id", updateGoal);

// router.delete("/:id", deleteGoal);

module.exports = router;
