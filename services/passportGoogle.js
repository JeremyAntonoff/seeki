const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { googleClientID, googleClientSecret } = require('../config/keys.js');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = new GoogleStrategy(
  {
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    const foundUser = await User.findOne({ 'google.googleID': profile.id });
    if (foundUser) {
      done(null, foundUser);
    } else {
      const newUser = User.create({
        'google.googleID': profile.id,
        'google.googleName': profile.displayName
      });
      done(null, newUser);
    }
  }
);
