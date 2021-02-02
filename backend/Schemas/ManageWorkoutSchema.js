const mongoose = require("mongoose")
const UserSchema = require("./UserSchema")

const WorkoutSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "Users" },
  //user: String,
  workout: {
    
    day1: {
      button: { type: String },
      exercises: [[]],
      panels: [{ type: Number }],
    },
    day2: {
      button: { type: String },
      exercises: [[]],
      panels: [{ type: Number }],
    },
    day3: {
      button: { type: String },
      exercises: [[]],
      panels: [{ type: Number }],
    },
    day4: {
      button: { type: String },
      exercises: [[]],
      panels: [{ type: Number }],
    },
    day5: {
      button: { type: String },
      exercises: [[]],
      panels: [{ type: Number }],
    },
    day6: {
      button: { type: String },
      exercises: [[]],
      panels: [{ type: Number }],
    },
    day7: {
      button: { type: String },
      exercises: [[]],
      panels: [{ type: Number }],
    },
  },
})

module.exports = WorkoutSchema
