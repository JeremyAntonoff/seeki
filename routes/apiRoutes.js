const express = require('express');
const router = express.Router();
const axios = require('axios');
require('../models/Token');
const mongoose = require('mongoose');
const Token = mongoose.model('Token');
const keys = require('../config/dev');

router.get('/api/results/:query', (req, res) => {
  (function getSpotifyData() {
    Token.findOne({ name: 'seeki' }).then(async tokens => {
      axios
        .get(
          `https://api.spotify.com/v1/search?q=${req.params.query}&type=track`,
          {
            headers: {
              Authorization: 'Bearer ' + tokens.spotifyAccessToken
            }
          }
        )
        .then(foundResult => {
          return res.send(foundResult.data);
        })
        .catch(async () => {
          axios({
            method: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            params: {
              grant_type: 'refresh_token',
              refresh_token: tokens.spotifyRefreshToken,
              redirect_uri: 'http://localhost:3000/auth/spotify/callback'
            },
            headers: {
              Authorization:
                'Basic ' +
                new Buffer(
                  keys.spotifyClientID + ':' + keys.spotifyClientSecret
                ).toString('base64'),
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(async res => {
              console.log(res);
              const updatedToken = await Token.findOneAndUpdate(
                { name: 'seeki' },
                { spotifyAccessToken: res.data.access_token },
                { new: true }
              );
              console.log('this is updated', updatedToken);
              getSpotifyData();
            })
            .catch(err => console.log(err));
        });
    });
  })();
});

module.exports = router;