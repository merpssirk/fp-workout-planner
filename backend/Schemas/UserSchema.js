const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema( {
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["female", "male", "other"] },
  age: {
    type: String,
    enum: ["child", "teen", "young", "middleAged", "bestAger", "old", "eldest"],
  },
  height: { type: Number },
  weight: { type: Number },
  disability: {
    type: String,
    default: "none",
    enum: ["arms", "legs", "back","none"],
  },
  workoutGoals: {
    type: String,
    enum: ["looseWeight", "stayFit", "gainMuscles"],
  },
  activityLevel: {
    type: String,
    enum: ["sedentary", "moderately", "active"],
  },
  workoutDays: { type: Number, enum: [1, 2, 3, 4, 5, 6] },
  avatar: { type: String },
  changePassword: {type: String}
})

module.exports = UserSchema;
