const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  name: String,
  spotifyAccessToken: String,
  spotifyRefreshToken: String
});

mongoose.model('Token', tokenSchema);
