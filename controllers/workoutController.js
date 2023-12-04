const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

async function getAllWorkouts(req, res) {
  const user_id = req.user._id;
  try {
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getSingleWorkout(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ msg: "ID is not valid" });
  }
  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: "No such workout" });
    }
    res.json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function postSingleWorkout(req, res) {
  const { title, load, reps } = req.body;
  try {
    const user_id = req.user._id;
    const response = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteSingleWorkout(req, res) {
  const { id } = req.params;
  try {
    const response = await Workout.findByIdAndDelete({ _id: id });
    res.status(200).json(response);
  } catch (error) {}
}

async function updateSingleWorkout(req, res) {
  const { id } = req.params;
  res.json({ msg: "update single workout" });
}

module.exports = {
  getAllWorkouts,
  getSingleWorkout,
  postSingleWorkout,
  deleteSingleWorkout,
  updateSingleWorkout,
};
