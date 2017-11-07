const express = require('express');
const router = express.Router();
const passport = require('passport');
const SpotifyStragey = require('passport-spotify').Strategy;
const middleWare = require('../middleware');

router.get(
  '/auth/spotify',
  middleWare.logout,
  passport.authenticate('spotify')
);
router.get('/auth/spotify/callback', passport.authenticate('spotify'));

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);
router.get(
  '/auth/google/callback',
  middleWare.logout,
  passport.authenticate('google')
);

router.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;
