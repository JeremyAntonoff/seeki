require('../models/Token');
const mongoose = require('mongoose');
const Token = mongoose.model('Token');
const keys = require('../config/keys');
Token.create({
  name: 'seeki',
  spotifyAccessToken: keys.spotifyAccessToken,
  spotifyRefreshToken: keys.spotifyRefreshToken
});
