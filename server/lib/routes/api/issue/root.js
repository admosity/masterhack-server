var mongoose = require('mongoose');
var geocoder = require('geocoder');
var router = require('express').Router({
  mergeParams: true
});
var isLoggedIn = require('lib/middleware/isLoggedIn');


var Issue = mongoose.model('Issue');

router.route('/')

.post(isLoggedIn, function(req, res) {

  var image = req.body.image;
  var description = req.body.description;
  var pledged = req.body.pledged;
  var loc = req.body.loc;

  if (!image || !description || !pledged || !loc) {
    return res.error(400, '7f78cfaa-8db5-42e5-9ffd-c3446cba2675');
  }

  var issue = new Issue({
    image: image
    description: description
    pledged: pledged
    loc: loc,
    pledgers: [{
      who: req.user,
      amount: pledged
    }]
  });

  // TODO: add payment

  issue.save(function(err) {
    if (err) return res.error(500, 'af55fd5d-9e04-417f-b826-0385aaacba5b');
    return res.ok(issue);
  });

})

.get(function(req, res) {
  // get issues by various query

  var query = {};


  var location = req.query.location;
  var distance = req.query.distance || 5;

  new Promise(function(resolve, reject) {
    if(location) {
      query.loc = {
        $near: [latitude, longitude],
        $maxDistance: maxDistance
      }
    }
  })


});

module.exports = router;
