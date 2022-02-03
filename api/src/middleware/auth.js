const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport")
const {
GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET  } = process.env;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",

  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
   // User.findOrCreate({ email: profile.email }, function (err, user) {
   //   return cb(err, user);
  //  });
  return done(err, profile)
  }
));

passport.serializeUser(function(user, done){
  done(null, user);
})
passport.deserializeUser(function(user, done){
  done(null, user);
})


