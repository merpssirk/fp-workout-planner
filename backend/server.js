const express = require( 'express' );
const mongoose = require( 'mongoose' );
const dotenv = require( 'dotenv' ).config();

const app = express();
app.use( express.json() );
// ROUTES
const UserRoutes = require( './UserRoutes/UserRoutes' );
app.use( '/user', UserRoutes );

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

