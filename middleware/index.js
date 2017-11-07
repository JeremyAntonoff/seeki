const express = require('express');
const app = express();

module.exports = {
  logout: function logout(req, res, next) {
    req.logout();
    next();
  }
};
