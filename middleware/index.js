const express = require('express');
const app = express();

module.exports = {
  logout: (req, res, next) => {
    req.logout();
    next();
  },
  setRedirect: (req, res, next) => {
    req.session.redirectTo = req.headers.referer;
    next();
  },
  successRedirect: (req, res) => {
    destination = req.session.redirectTo || '/';
    res.redirect(destination);
  }
};
