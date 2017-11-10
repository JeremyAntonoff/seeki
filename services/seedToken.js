require('../models/Token')
const mongoose = require('mongoose');
const Token = mongoose.model('Token');

Token.create({
  name: 'seeki',
  spotifyAccessToken: process.env.SPOTIFY_ACCESS_TOKEN,
  spotifyRefreshToken: process.env.SPOTIFY_REFRESH_TOKEN
})
