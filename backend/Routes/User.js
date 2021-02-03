const express = require( "express" )
const bcrypt = require( "bcrypt" )

const Users = require("../Models/UserModel")
const { jwtIssuer } = require("../utils/jwtIssuer")
const WorkoutInfo = require("../Models/WorkoutModel")
const router = express.Router()
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
        .json({ msg: "Password Should be at least 8 Characters" })

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
      timestamps: {
        createdAt: Date.now(),
        lastUpdatedAt: Date.now(),
        startWorkoutAt: Date.now(),
        
      },
    })
    //Save in MongoDB
    const savedUser = await newUser.save()
    const token = jwtIssuer(savedUser)
    response
      .cookie("jwt", token, {
        httpOnly: true,
        sameSite: "lax",
      })
      .json({msg: "Registered successfully!!!"})
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


module.exports = router
