const express = require( 'express' );
const mongoose = require( 'mongoose' );
const dotenv = require( 'dotenv' ).config();
const cookieParser = require( 'cookie-parser' );
const passport = require( "passport" );
const { jwtStrategy } = require( "./utils/passportStrategies" );
const cors = require( "cors" );

const app = express();
passport.use( jwtStrategy );

//middleware
app.use( cors() );
app.use( express.json() );
app.use( cookieParser() );
app.use( passport.initialize() );

// ROUTES
const UserRoutes = require( './Routes/User' );
const DashboardRoutes = require( "./Routes/Dashboard" );
app.use( '/user', UserRoutes );
app.use( '/dashboard', DashboardRoutes );

// CONNECT TO THE MONGODB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.MONGO_URI}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("MonogoDB is connected 😎");
  })
  .catch((err) => {
    console.log(err);
  } ); 
  
//LISTEN TO THE SERVER
app.listen( `${process.env.SERVER_PORT}`, () => {
    console.log(`Server Started on Port ${process.env.SERVER_PORT}`);
})

