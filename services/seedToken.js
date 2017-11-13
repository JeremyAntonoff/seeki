require('../models/Token');
const mongoose = require('mongoose');
const Token = mongoose.model('Token');
const keys = require('../config/keys');
console.log('KEY1', keys.spotifyAccessToken);
console.log('KEY2', keys.spotifyRefreshToken);
Token.create({
  name: 'seeki',
  spotifyAccessToken: keys.spotifyAccessToken,
  spotifyRefreshToken: keys.spotifyRefreshToken
});
