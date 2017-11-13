const SpotifyStrategy = require('passport-spotify').Strategy;
const { spotifyClientID, spotifyClientSecret } = require('../config/keys.js');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = new SpotifyStrategy(
  {
    clientID: spotifyClientID,
    clientSecret: spotifyClientSecret,
    callbackURL: '/auth/spotify/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    const firstName = profile.id.split(' ')[0];
    const profileName = firstName.length < 5 ? firstName : 'Seeki User';
    const foundUser = await User.findOne({ 'spotify.spotifyID': profile.id });
    if (foundUser) {
      done(null, foundUser);
    } else {
      const newUser = await User.create({
        'spotify.spotifyID': profile.id,
        'spotify.spotifyName': profileName
      });
      done(null, newUser);
    }
  }
);
