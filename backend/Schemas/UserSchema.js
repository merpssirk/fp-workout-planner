const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["female", "male", "other"] },
  age: {
    type: Number,
  },
  height: { type: Number },
  weight: { type: Number },
  updatedWeight: [{ type: Number }],
  timestamps: {
    createdAt: {type: Date},
    lastUpdatedAt: { type: Date },
    startWorkoutAt: {type: Date}
  },
  disability: {
    type: String,
    default: "none",
    enum: ["arms", "legs", "back", "none"],
  },
  workoutGoals: {
    type: String,
    enum: ["looseWeight", "stayFit", "gainMuscles"],
  },
  activityLevel: {
    type: String,
    enum: ["sedentary", "moderately", "active", "extraActive"],
  },
  workoutDays: { type: Number, enum: [1, 2, 3, 4, 5, 6] },
  avatar: { type: String },
  changePassword: { type: String },
})

module.exports = UserSchema
