const express = require("express");
const Users = require( "../Models/UserModel" );
const bcrypt = require( 'bcrypt' );


const router = express.Router();

//Register Page
router.post("/register", async (request, response) => {
  try {
    const { username, email, password } = request.body;
    const user = await Users.findOne({ email });

    if (user) {
      return response.status(400).send({ msg: "This E-Mail Already Exists" });
    }
    if (password.length < 8) {
      return response
        .status(400)
        .send({ msg: "Password Should be at least 8 Characters long" });
    }

    //Password Encryption
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new Users({
      username,
      email,
      password: passwordHash,
    });
    //Save in MongoDB
    
    //response.send( { msg: "Successfully Registered" } );
    response.send({ newUser });
  } catch (err) {
    return response.status(500).send({ msg: err.message });
  }
});
//Dashboard Page
router.get("/dashboardData", (request, response) => {
  response.send("welcome");
});

//User Profile Edit Page
router.put("/profileEdit", (request, response) => {
  response.send("welcome");
});

//Manage Workout Page
router.put("/workoutEdit", (request, response) => {
  response.send("welcome");
});

//Workout Overview Page
router.get("/workoutOverview", (request, response) => {
  response.send("welcome");
});

//Finish Registration page
router.post("/finishRegistration", (request, response) => {
  response.send("welcome");
});

// Daily Activity Page
router.get("/dailyActivity", (request, response) => {
  response.send("welcome");
});

module.exports = router;
