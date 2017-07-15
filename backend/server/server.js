require('dotenv').config();

const express = require('express');

const session = require('express-session');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models');
const routerIndex = require('../routes').routes;
const uuid = require('uuid');
const passport = require('./config/passport');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../../frontend/public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SECRET_LOGIN_KEY,
  store: new SequelizeStore({
      genid: function(req) {
        return uuid()
      },
      db: db.sequelize,
      table: 'Session'
  }),
  saveUninitialized: true,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Method', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});

app.use('/api/users', routerIndex.Users);
app.use('/api/', routerIndex.Login);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/views/index.html'));
});

app.listen(process.env.PORT || 5885, () => {
  console.log('CORS-enabled web server listening at http://localhost:5885')
});

module.exports = app;
