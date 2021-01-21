const express = require("express")
const Users = require("../Models/UserModel")
const WorkoutInfo = require("../Models/WorkoutModel")
const bcrypt = require("bcrypt")
const { jwtIssuer } = require("../utils/jwtIssuer")
const { body, validationResult } = require("express-validator")
const passport = require("passport")

const router = express.Router()

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
    const token = jwtIssuer(savedUser)
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
    if (!isMatch) return response.status(400).json({ msg: "Invalid Password" })

    //creating jsonwebtoken (jwt)
    const token = jwtIssuer(user)
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
//------POST UPDATED WEIGHT-------
router.post(
  "/updatedWeight",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    const { updatedWeight } = request.body
    const newUser = {
      updatedWeight,
    }
    const user = await Users.findByIdAndUpdate(
      request.user,
      {
        $push: newUser,
        timestamps: {
          createdAt: Date.now(),
          lastUpdatedAt: Date.now(),
        },
      },
      { new: true }
    )
    if (user) {
      response.status(200).json({ msg: "Your weight is Updated" })
    } else {
      response.status(401).json({ msg: "Can not update your weight!!!" })
    }
  }
)
//GET UPDATED WEIGHT
router.get(
  "/updatedWeight",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    try {
      const updatedWeight = await Users.find({ _id: request.user })
      // console.log(updatedWeight)
      response.status(200).json(updatedWeight)
    } catch (err) {
      response.status(500).json({ msg: err.message })
    }
  }
)

//--------DASHBOARD-------
router.get(
  "/dashboardNutrition",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    try {
      const userInfo = await Users.find({ _id: request.user })
      // console.log(userInfo)
      response.status(200).json(userInfo)
    } catch (err) {
      response.status(500).json({ msg: err.message })
    }
    // response.send("welcome")
  }
)

//User Profile Edit Page
router.put(
  "/profileEdit",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    const {
      username,
      email,
      gender,
      age,
      height,
      weight,
      disability,
      workoutGoals,
      activityLevel,
      workoutDays,
    } = request.body
    //  console.log(request.body)
    const newUser = {
      username,
      email,
      gender,
      age,
      height,
      weight,
      disability,
      workoutGoals,
      activityLevel,
      workoutDays,
    }

    const userEdit = await Users.findByIdAndUpdate(
      request.user,
      {
        $set: newUser,
      },
      { new: true }
    )
    if (userEdit) {
      response.status(200).json({ msg: "Profile Edited Successfully" })
    } else {
      response.status(401).json({ msg: "Can not edit your profile!!!" })
    }
  }
)

//Manage Workout Page
router.post(
  "/manageWorkout",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    try {
      const { exercise, bodyPart, sets, repetitions } = request.body
      const newUserWorkout = new WorkoutInfo([{
        exercise,
        bodyPart,
        sets,
        repetitions,}
      ])

      const user = await Users.findById( request.user )
      await newUserWorkout.save()
      console.log("newUserData", newUserWorkout);
      console.log( user )
      if (user) {
        response.status(200).json({ msg: "workout saved" })
      } else {
        response.status(401).json({ msg: "workout can not save" })
      }
    } catch ( err ) {
      response.status(401).json({msg: err.message})
      console.log(err);
    }

    
  }
)

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
    body("age").isNumeric(),
    body(["height", "weight"]).isNumeric(),
    body("disability").isIn(["arms", "legs", "back", "none"]),
    body("workoutGoals").isIn(["looseWeight", "stayFit", "gainMuscles"]),
    body("workoutDays").isNumeric().isIn([1, 2, 3, 4, 5, 6]),
    body("activityLevel").isIn([
      "sedentary",
      "moderately",
      "active",
      "extraActive",
    ]),
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
    // console.log(request.body)
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
    console.log("user_ID", request.user)
    const user = await Users.findByIdAndUpdate(
      request.user,
      {
        $set: newUser,
        timestamps: {
          createdAt: Date.now(),
          lastUpdatedAt: Date.now(),
        },
      },
      { new: true }
    )

    if (user) {
      const result = validationResult(request)
      if (result.errors.length > 0) {
        return response.status(400).json({ result: result.errors })
      }
      response.status(200).json({ msg: "Registration Finished" })
    } else {
      response.status(401).json({ msg: "Can not find User" })
    }
  }
)

// Daily Activity Page
router.get("/dailyActivity", (request, response) => {
  response.send("welcome")
})

module.exports = router
