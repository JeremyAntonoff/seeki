const passport = require('passport');
const SpotifyStrategy = require('./passportSpotify');
const GoogleStrategy = require('./passportGoogle');
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const foundUser = await User.findById(id);
  done(null, foundUser);
});

passport.use(SpotifyStrategy);
passport.use(GoogleStrategy);
