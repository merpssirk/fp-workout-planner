const mongoose = require("mongoose")
const UserSchema = require("./UserSchema")

const WorkoutSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'Users'},
  day: [
    [
      {
        exercise: {type: Number},
        bodyPart: { type: String },
        sets: { type: Number },
        repetitions: { type: Number },
      },
    ],
  ],
})

module.exports = WorkoutSchema;