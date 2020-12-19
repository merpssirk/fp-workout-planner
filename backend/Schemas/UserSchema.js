const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: {type: String, required: true},
  gender: { type: String, required: true, enum: ["Female", "Male", "Other"] },
  age: { type: Number, required: true },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  disability: {
    type: String,
    default: "None",
    enum: ["Arms", "Legs", "Back", "Shoulders", "None"],
  },
  workoutGoal: {
    type: String,
    required: true,
    enum: ["Lose Weight", "Stay Fit", "Gain Muscles"],
  },
  activityLevel: {
    type: String,
    required: true,
    enum: ["Sedentary", "Moderately", "Active"],
  },
});

module.exports = UserSchema;
