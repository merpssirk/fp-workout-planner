const jsonwebtoken = require("jsonwebtoken")

function jwtIssuer(user) {
  const expiresIn = "1d"
  const payload = {
    sub: user._id,
    iat: Date.now(),
  }

  const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET_TOKEN)

  return {
    token: `Bearer ${signedToken}`,
    expiresIn,
  }
}

module.exports = {
  jwtIssuer,
}
