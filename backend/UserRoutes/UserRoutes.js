const { response } = require( 'express' );
const express = require( 'express' );


const router = express.Router();

//Dashboard Page
router.get( '/dashboardData', ( request, response ) => {
    response.send( 'welcome' );
} )

//User Profile Edit Page
router.put("/profileEdit", (request, response) => {
  response.send("welcome");
} );

//Manage Workout Page
router.put("/workoutEdit", (request, response) => {
  response.send("welcome");
} );

//Workout Overview Page
router.get("/workoutOverview", (request, response) => {
  response.send("welcome");
} );

//Finish Registration page
router.post("/finishRegistration", (request, response) => {
  response.send("welcome");
} );

// Daily Activity Page
router.get("/dailyActivity", (request, response) => {
  response.send("welcome");
});

module.exports = router;