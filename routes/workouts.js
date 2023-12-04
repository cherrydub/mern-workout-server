const express = require("express");
const router = express.Router();

const {
  getAllWorkouts,
  getSingleWorkout,
  postSingleWorkout,
  deleteSingleWorkout,
  updateSingleWorkout,
} = require("../controllers/workoutController");

const requireAuth = require("../middleware/requireAuth");

//require auth for all workout routes
router.use(requireAuth);

//get all workouts
router.get("/", getAllWorkouts);

//get id workout
router.get("/:id", getSingleWorkout);

//add single workout
router.post("/", postSingleWorkout);

//delete single workout
router.delete("/:id", deleteSingleWorkout);

//update workout
router.patch("/:id", updateSingleWorkout);

module.exports = router;
