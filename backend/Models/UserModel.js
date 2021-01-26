const mongoose = require( 'mongoose' );
const UserSchema = require( '../Schemas/UserSchema' );

const Users = mongoose.model( 'Users', UserSchema );

module.exports = Users