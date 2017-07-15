const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('../models');

passport.serializeUser(function(user, done) {
  console.log('SERIALIZE USER >>>>>>', user.id)
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('DESERIALIZE USER >>>>>>', id)
  models.Users.findOne({
    where: {
      id
    }
  })
  .then((user) => {
    done(null, user.dataValues);
  })
});

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  }, (email, password, done) => {
    console.log('<<<<<< BEGIN AUTHENTICATION >>>>>>')
    models.Users.findOne({
      where: {
        email
      }
    })
    .then((user) => {
      if (!user) {
        console.log('<<<<<< EMAIL NOT FOUND >>>>>>')
        return done(null, false, {
          message: 'Email does not exist.'
        });
      }
      if (!user.validPassword(password)) {
        console.log('<<<<<< INVALID PASSWORD >>>>>>')
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      console.log('<<<<<< AUTHENTICATION COMPLETE >>>>>>')
      return done(null, user.dataValues);
    })
    .catch((err) => {
      if (err) {
        console.log('<<<<<< ERROR >>>>>>')
        return done(err);
      }
      return done(err);
    });
  }
));

module.exports = passport;
