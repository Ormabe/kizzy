const express = require('express');

const router = express.Router();

const passport = require('../server/config/passport');

router.post('/login',

  function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      console.log('AUTH >>>>>>', user)
      if (err) { return next(err); }
      if (!user) { res.status(401).end(); return; }

      req.logIn(user, function(err) {
        if (err) { res.status(401).end(); return; }
        res.send(`http://localhost:5858/`)
      });
    })(req, res, next);
  })

  router.get('/logout', function(req, res) {
    console.log('<<<<<< USER LOGGED OUT >>>>>>')
    req.logout();
    req.session.destroy();
    res.send(`http://localhost:5858/`)
  });

  module.exports = router;
