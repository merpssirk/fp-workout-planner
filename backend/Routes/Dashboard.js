const express = require("express")
const passport = require("passport")
const { body, validationResult } = require( "express-validator" )

const Users = require( "../Models/UserModel" )
const WorkoutInfo = require("../Models/WorkoutModel")

const router = express.Router()

router.use(passport.authenticate("jwt", { session: false }))

//--FINISH REGISTRATION PAGE--//
router.post(
  "/finishRegistration",
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

//--DASHBOARD: "POST" UPDATED WEIGHT--//
router.post("/updatedWeight", async (request, response) => {
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
})
//--DASHBOARD: "GET" UPDATED WEIGHT--//
router.get("/updatedWeight", async (request, response) => {
  try {
    const updatedWeight = await Users.find({ _id: request.user })
    // console.log(updatedWeight)
    response.status(200).json(updatedWeight)
  } catch (err) {
    response.status(500).json({ msg: err.message })
  }
})

//--DASHBOARD: "GET" NUTRITION INFO--//
router.get("/dashboardNutrition", async (request, response) => {
  try {
    const userInfo = await Users.find({ _id: request.user })
    // console.log(userInfo)
    response.status(200).json(userInfo)
  } catch (err) {
    response.status(500).json({ msg: err.message })
  }
})

//--DASHBOARD: UPDATE USER-PROFILE PAGE--//
router.put("/profileEdit", async (request, response) => {
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
})

//--DASHBOARD: MANAGE-WORKOUT PAGE--//
router.post("/manageWorkout", async (request, response) => {
  try {
    const { exercise, bodyPart, sets, repetitions } = request.body
    const newUserWorkout = new WorkoutInfo({
      day: [
        [
          {
            exercise,
            bodyPart,
            sets,
            repetitions,
          },
        ],
      ],
    })

    const user = await Users.findById({ _id: request.user })
    //console.log("Request.User", request.user);
    console.log( "newUserWorkout : ", newUserWorkout )
    newUserWorkout.user = user._id
    await newUserWorkout.save()

    console.log("newUserData", newUserWorkout)
    console.log(user)
    if (user) {
      response.status(200).json({ msg: "workout saved" })
    } else {
      response.status(401).json({ msg: "workout can not save" })
    }
  } catch (err) {
    response.status(401).json({ msg: err.message })
    console.log(err)
  }
})

//--DASHBOARD: WORKOUT-OVERVIEW PAGE--//
router.get("/workoutOverview", (request, response) => {
  response.send("welcome")
})

//--DASHBOARD: DAILY-ACTIVITY PAGE--//
router.get("/dailyActivity", (request, response) => {
  response.send("welcome")
})

module.exports = router
