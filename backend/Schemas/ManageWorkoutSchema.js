const mongoose = require("mongoose")
const UserSchema = require("./UserSchema")

const WorkoutSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'Users' },
  //user: String,
  workout: {
    day1: {
      exercises: [[]],
    },
    day2: {
      exercises: [[]],
    },
    day3: {
      exercises: [[]],
    },
    day4: {
      exercises: [[]],
    },
    day5: {
      exercises: [[]],
    },
    day6: {
      exercises: [[]],
    },
    day7: {
      exercises: [[]],
    },
  },
})

module.exports = WorkoutSchema
