const router = require('express').Router();
const Users = require('../server/models').Users;
const models = require('../server/models');
const passport = require('../server/config/passport');

router.post('/',
  function(req, res, next) {
    return Users.findOrCreate({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    })
    .then((user) => {
      console.log('<<<<<< USER ID >>>>>>', user)
      passport.authenticate('local', function(err, user, info) {
        console.log('<<<<<< AUTH USER >>>>>>', user)
        if (err) { return next(err); }
        if (!user) { res.status(401).end(); return; }
        req.logIn(user, function(err) {
          if (err) { res.status(401).end(); return; }
          res.send(`http://localhost:5858`)
        });
      })(req, res, next);
    })
    .catch((err) => {
      res.send(err).end();
    });
  })

  module.exports = router;
