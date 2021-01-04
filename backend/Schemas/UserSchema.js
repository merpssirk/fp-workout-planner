const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: {type: String, required: true},
  gender: { type: String, enum: ["Female", "Male", "Other"] },
  age: { type: Number, },
  height: { type: String, },
  weight: { type: String,  },
  disability: {
    type: String,
    default: "None",
    enum: ["Arms", "Legs", "Back", "Shoulders", "None"],
  },
  workoutGoal: {
    type: String,
    enum: ["Lose Weight", "Stay Fit", "Gain Muscles"],
  },
  activityLevel: {
    type: String,
    enum: ["Sedentary", "Moderately", "Active"],
  },
});

module.exports = UserSchema;
