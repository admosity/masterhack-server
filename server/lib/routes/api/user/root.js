var mongoose = require('mongoose');
var router = require('express').Router({ mergeParams: true });
var User = mongoose.model('User');
var passport = require('passport');

router.post('/login', passport.authenticate('local'), function(req, res) {
  var user = req.user;
  return res.ok({
    _id: user._id,
    email: user.email,
  });
});

router.post('/signup', function (req, res) {

  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var address1 = req.body.address1;
  var address2 = req.body.address2;
  var city = req.body.city;
  var state = req.body.state;
  var zip = req.body.zip;
  var password = req.body.password;

  User.findOne({email: email}, function(err, user) {
    if(user) {
      return req.login(user, function () {
        return res.ok({
          _id: user._id,
          email: user.email,
        });
      });
    } else {
      return bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          if(err) return res.error('d36baf73-3925-4b51-9f3c-5e2230091a1f');
          var newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            address1: address1,
            address2: address2,
            city: city,
            state: state,
            zip: zip,
            password: hash,
          });

          newUser.save(function(err) {
            if(err) return res.error('6a693432-6277-4897-a589-dae02ab893be');
            return req.login(newUser, function () {
              return res.ok({
                _id: newUser._id,
                email: newUser.email,
              });
            });
          });
        });
      });
    }
  })
});

router.post('/logout', function(req, res) {
  if(!req.user) return res.ok();
  req.logout();
  return res.ok();
});

router.get('/', function(req, res) {
  if(!req.user) return res.error(403, false);
  return res.ok(req.user);
});

module.exports = router;
