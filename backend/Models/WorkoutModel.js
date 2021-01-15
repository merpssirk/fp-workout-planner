const mongoose = require( 'mongoose' );
const WorkoutSchema = require( '../Schemas/ManageWorkoutSchema' );

const WorkoutInfo = mongoose.model( 'workoutInfo', WorkoutSchema );

module.exports = WorkoutInfo;
