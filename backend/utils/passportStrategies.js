const { Strategy: JwtStrategy } = require("passport-jwt")

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ( request ) => {
     // console.log(request.cookies);
      return request.cookies['jwt']
    },
    secretOrKey: process.env.JWT_SECRET_TOKEN,
  },
  ( payload, done ) => {
    //console.log('payload : ',payload);
    return done(null, payload.sub)
  }
)

module.exports = { jwtStrategy }
