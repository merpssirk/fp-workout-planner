const jsonwebtoken = require("jsonwebtoken")

function jwtIssuer(user) {
  const expiresIn = "1d"
  const payload = {
    sub: user._id,
    iat: Date.now(),
  }

  const signedToken = jsonwebtoken.sign( payload, process.env.JWT_SECRET_TOKEN,
  {expiresIn:'1d'})

  return  signedToken       
}

module.exports = {
  jwtIssuer,
}
