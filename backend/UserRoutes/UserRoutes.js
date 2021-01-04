const express = require("express");
const Users = require( "../Models/UserModel" );
const bcrypt = require( 'bcrypt' );
const { jwtIssuer } = require( "../utils/jwtIssuer" );

const router = express.Router();

//-------------Register Page------------------
router.post("/register", async (request, response) => {
  try {
    const { username, email, password } = request.body;

    //Valitadion
    if (!username || !email || !password)
      return response
        .status(400)
        .json({ msg: "Not all fields have been entered." });

    if (password.length < 8)
      return response
        .status(400)
        .json({ msg: "Password Should be at least 8 Characters long" });

    const existingUser = await Users.findOne({ email: email });
    if (existingUser)
      return response.status(400).json({ msg: "This E-Mail Already Exists" });

    //Password Encryption
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new Users({
      username,
      email,
      password: passwordHash,
    });
    //Save in MongoDB
    const savedUser = await newUser.save();
    //response.json( savedUser );

    response.json({ msg: "Successfully Registered" });
  } catch (err) {
    return response.status(500).json({ msg: err.message });
  }
});

//--------------Login page-----------------

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    //validation
    if (!email || !password)
      return response
        .status(400)
        .json( { msg: "Not all fields have been entered" } );
    
    const user = await Users.findOne({ email: email });
    if (!user)
      return response
        .status(400)
        .json({ msg: "No accout with this email has been registered" });

    //comparing password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return response.status(400).json({ msg: "Invalid Credentials" });

    //creating jsonwebtoken (jwt)
    const token = jwtIssuer(user);
    response.status(200).json({ token });
    console.log(token);
  } catch (err) {
    return response.status(500).json({ msg: err.message });
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
