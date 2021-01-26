const mongoose = require( 'mongoose' );
const WorkoutSchema = require( '../Schemas/ManageWorkoutSchema' );

//const WorkoutInfo = mongoose.model( 'WorkoutInfo', WorkoutSchema );

module.exports = mongoose.model("WorkoutInfo", WorkoutSchema);
