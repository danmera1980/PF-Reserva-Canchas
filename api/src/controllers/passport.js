const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport")
const {
GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET  } = process.env;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  /*function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }/*/
  function(accessToken, refreshToken, profile, done){
      done(null, profile)
  }

));

passport