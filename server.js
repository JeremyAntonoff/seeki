const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
// require('./services/seedToken.js')
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const userApiRoutes = require('./routes/userApiRoutes');
const PORT = process.env.port || 5000;
mongoose.connect(keys.mongoURI, { useMongoClient: true });

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authRoutes);
app.use(apiRoutes);
app.use(userApiRoutes);
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
