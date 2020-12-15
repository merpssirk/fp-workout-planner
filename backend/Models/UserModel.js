const mongoose = require( 'mongoose' );
const UserSchema = require( '../Schemas/UserSchema' );

const UserModel = mongoose.model( 'UserModel', UserSchema );

module.exports = UserModel;