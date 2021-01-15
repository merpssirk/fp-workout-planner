const express = require("express")
const Users = require( "../Models/UserModel" )
const WorkoutInfo = require( "../Models/WorkoutModel" );
const bcrypt = require("bcrypt")
const { jwtIssuer } = require("../utils/jwtIssuer")
const { body, validationResult } = require( "express-validator" );
const passport = require( "passport" );

const router = express.Router();

//router.use( passport.authenticate( 'jwt', { session: false } ) );

//-------------Register Page------------------
router.post("/register", async (request, response) => {
  try {
    const { username, email, password } = request.body

    //Valitadion
    if (!username || !email || !password)
      return response
        .status(400)
        .json({ msg: "Not all fields have been entered." })

    if (password.length < 8)
      return response
        .status(400)
        .json({ msg: "Password Should be at least 8 Characters long" })

    const existingUser = await Users.findOne({ email: email })
    if (existingUser)
      return response.status(400).json({ msg: "This E-Mail Already Exists" })

    //Password Encryption
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new Users({
      username,
      email,
      password: passwordHash,
    })
    //Save in MongoDB
    const savedUser = await newUser.save()
    const token = jwtIssuer( savedUser )
    response
      .cookie("jwt", token, {
        httpOnly: true,
        sameSite: "lax",
      })
      .send("Registered successfully!!!")
  } catch (err) {
    return response.status(500).json({ msg: err.message })
  }
})

//--------------Login page-----------------

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body

    //validation
    if (!email || !password)
      return response
        .status(400)
        .json({ msg: "Not all fields have been entered" })

    const user = await Users.findOne({ email: email })
    if (!user)
      return response
        .status(400)
        .json({ msg: "No account with this email has been registered" })

    //comparing password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return response.status(400).json({ msg: "Invalid Password" })

    //creating jsonwebtoken (jwt)
    const token = jwtIssuer( user );
    response
      .cookie("jwt", token, {
        httpOnly: true,
        sameSite: "lax",
      })
      .json({ msg: "LoggedIn successfully!!!" })
    
  } catch (err) {
    return response.status(500).json({ msg: err.message })
  }
})
//Dashboard Page
router.get("/dashboardData", (request, response) => {
  response.send("welcome")
})

//User Profile Edit Page
router.put(
  "/profileEdit/:id",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    const { id: _id } = request.params

    const updateField = request.body
    
    const updateUserField = await Users.findByIdAndUpdate(_id, {
      ...updateField,
      _id,
    })
    console.log(updateUserField)
    response.json(updateUserField)
  }
)

//Manage Workout Page
router.put("/workoutEdit", (request, response) => {
  
  response.send( "welcome" )
  
})

//Workout Overview Page
router.get("/workoutOverview", (request, response) => {
  response.send("welcome")
})

//Finish Registration page
router.post(
  "/finishRegistration",
  passport.authenticate("jwt", { session: false }),
  [
    body("gender").isIn(["female", "male", "other"]),
    body("age").isIn([
      "child",
      "teen",
      "young",
      "middleAged",
      "bestAger",
      "old",
      "eldest",
    ]),
    body(["height", "weight"]).isNumeric(),
    body("disability").isIn(["arms", "legs", "back", "none"]),
    body("workoutGoals").isIn(["looseWeight", "stayFit", "gainMuscles"]),
    body("workoutDays").isNumeric().isIn([1, 2, 3, 4, 5, 6]),
    body("activityLevel").isIn(["sedentary", "moderately", "active"]),
  ],
  async (request, response) => {
    const {
      gender,
      age,
      height,
      weight,
      disability,
      workoutGoals,
      activityLevel,
      workoutDays,
    } = request.body
    console.log(request.body)
    const newUser = {
      gender,
      age,
      height,
      weight,
      disability,
      workoutGoals,
      workoutDays,
      activityLevel,
    }
    console.log('1',request.user);
    const user = await Users.findByIdAndUpdate(
      request.user,
      { $set: newUser },
      { new: true }
    )
  
    if (user) {
      const result = validationResult(request)
      if (result.errors.length > 0) {
       return response.status(400).json({ result: result.errors })
      }
      response.status(200).json({msg: "Registration Finished"})
    } else {
      response.status( 401 ).json( { msg: "Can not find User" })
    }
  }
)

// Daily Activity Page
router.get("/dailyActivity", (request, response) => {
  response.send("welcome")
})

module.exports = router
