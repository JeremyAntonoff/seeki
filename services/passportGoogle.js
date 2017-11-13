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
    const firstName = profile.displayName.split(' ')[0];
    const profileName = firstName.length < 12 ? firstName : 'Seeki User';
    console.log(profileName);
    const foundUser = await User.findOne({ 'google.googleID': profile.id });
    if (foundUser) {
      done(null, foundUser);
    } else {
      const newUser = await User.create({
        'google.googleID': profile.id,
        'google.googleName': profileName
      });
      done(null, newUser);
    }
  }
);
