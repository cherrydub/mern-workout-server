require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const mongouri = process.env.MONGO_URI;
const app = express();
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

const PORT = process.env.PORT ?? 5050;

app.use(
  cors({
    origin: ["https://mern-workout-client.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://mern-workout-client.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());
app.use((req, res, next) => {
  console.log("method:", req.method);
  console.log("path", req.path);
  console.log("body", req.body);
  console.log("__________");
  next();
});

app.use("/api/workouts", workoutRoutes);

app.use("/api/user", userRoutes);

app.use("/*", (req, res) => {
  res.status(404).send({ msg: "404 Path not found!!!" });
});

//connect to db
mongoose
  .connect(mongouri)
  .then(() => {
    //listen to server
    app.listen(PORT, (err) => {
      if (err) console.log("error:", err);
      else console.log(`Connected to db & listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

module.exports = app;
