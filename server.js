const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const PORT = process.env.port || 4000;
mongoose.connect(keys.mongoURI, { useMongoClient: true });

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
