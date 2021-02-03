const express = require("express")
const passport = require("passport")
const { body, validationResult } = require("express-validator")

const Users = require("../Models/UserModel")
const WorkoutInfo = require("../Models/WorkoutModel")
const { request, response } = require("express")

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
  const { updatedWeightField, weekOfYear } = request.body
  const updatedWeight = [updatedWeightField, weekOfYear]
  console.log("updatedWeight", updatedWeightField)

  const newUser = {
    updatedWeight,
  }
  const user = await Users.findByIdAndUpdate(
    request.user,
    {
      $push: newUser,
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
    const { workout } = request.body

    const workoutData = await WorkoutInfo.findOne({
      user: request.user,
    })

    if (workoutData) {
      await WorkoutInfo.findByIdAndUpdate(workoutData._id, workout, {
        new: true,
      })
    } else {
      const newUserWorkout = await new WorkoutInfo({
        user: request.user,
        workout: workout,
      })
      await newUserWorkout.save()
    }

    if (workoutData) {
      response.status(200).json({ msg: "workoutData updated" })
    } else {
      response.status(401).json({ msg: "workoutData can not update" })
    }
  } catch (err) {
    response.status(401).json({ msg: err.message })
    // console.log(err)
  }
})

//--DASHBOARD: WORKOUT-OVERVIEW PAGE--//
router.get("/workoutOverview", (request, response) => {
  response.send("welcome")
})

//--DASHBOARD: DAILY-ACTIVITY PAGE--//
router.get("/dailyActivity", async (request, response) => {
  try {
    const defaultDailyActivity = await Users.findOne({ _id: request.user })
    console.log("defaultDailyActivity", defaultDailyActivity)
    response.status(200).json(defaultDailyActivity)
  } catch (error) {
    response.status(401).json({ msg: error.message })
  }
})

//--DASHBOARD: DEFAULT-WORKOUT--//
router.post("/defaultWorkout", async (request, response) => {
  try {
    const { workout } = request.body
    const defaultWorkoutData = await new WorkoutInfo({
      workout,
      user: request.user,
    })
    await defaultWorkoutData.save()
    response.json(defaultWorkoutData)
  } catch (error) {
    response.status(401).json({ msg: error.message })
    console.log(error)
  }
})

//--DASHBOARD: DEFAULT-WORKOUT  GET DATA--//
router.get("/defaultWorkoutTwo", async (request, response) => {
  try {
    console.log("DEFAULT-WORKOUT", request.user)
    const defaultData = await WorkoutInfo.findOne({ user: request.user })

    response.status(200).json(defaultData)
    // console.log("GET-DefaultData",defaultData);
  } catch (error) {
    response.status(401).json({ msg: error.message })
  }
})

//--DAILY-ACTIVITIES PAGE: "POST" ACTIVITIES DATE--//
router.post("/updateDate", async (request, response) => {
  try {
    const { doneWorkout } = request.body

    console.log("doneWorkout :", doneWorkout)
    const user = await Users.findByIdAndUpdate(
      request.user,
      {
        $push: { "timestamps.doneWorkout": doneWorkout },
      },
      { new: true }
    )

    if (user) {
      response.status(200).json({ msg: "Your daily activity date is saved" })
    } else {
      response
        .status(401)
        .json({ msg: "Can not saved your daily activity date" })
    }
  } catch (error) {
    response.status(401).json({ msg: error.message })
  }
})

module.exports = router
