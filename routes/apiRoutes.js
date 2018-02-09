const express = require('express');
const router = express.Router();
const axios = require('axios');
require('../models/Token');
const mongoose = require('mongoose');
const Token = mongoose.model('Token');
const keys = require('../config/keys');

router.get('/api/results/:query', (req, res) => {
  let randomFail = Math.floor(Math.random() * 60) + 1;
  if (randomFail <= 40) {
    return res.send(503);
  }
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
          const foundResults = foundResult.data.tracks.items.map(function(
            result
          ) {
            return {
              id: 0,
              artist: result.artists[0].name,
              artistUrl: result.artists[0].external_urls.spotify,
              track: result.name,
              trackUrl: result.external_urls.spotify,
              albumArt: result.album.images[1].url,
              albumURL: result.album.external_urls.spotify,
              previewURL: result.preview_url
            };
          });
          res.send(foundResults);
        })
        .catch(async () => {
          axios({
            method: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            params: {
              grant_type: 'refresh_token',
              refresh_token: tokens.spotifyRefreshToken,
              redirect_uri: keys.spotifyCallbackURI
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
              const updatedToken = await Token.findOneAndUpdate(
                { name: 'seeki' },
                { spotifyAccessToken: res.data.access_token },
                { new: true }
              );
              console.log('Token Updated: ', updatedToken);
              getSpotifyData();
            })
            .catch(err => console.log(err));
        });
    });
  })();
});

module.exports = router;
