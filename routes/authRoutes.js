const express = require('express');
const router = express.Router();
const passport = require('passport');
const SpotifyStragey = require('passport-spotify').Strategy;
const middleWare = require('../middleware');

router.get(
  '/auth/spotify',
  middleWare.logout,
  middleWare.setRedirect,
  passport.authenticate('spotify')
);

router.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  middleWare.successRedirect
);

router.get(
  '/auth/google',
  middleWare.logout,
  middleWare.setRedirect,
  passport.authenticate('google', {
    scope: ['profile']
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  middleWare.successRedirect
);

router.get('/auth/current_user', (req, res) => {
  res.send(req.user);
});

router.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
