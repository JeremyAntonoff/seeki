const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  spotify: {
    spotifyID: String
  },
  google: {
    googleID: String,
    googleName: String
  }
});

mongoose.model('User', userSchema);
