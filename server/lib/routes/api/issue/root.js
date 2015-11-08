var mongoose = require('mongoose');
var geocoder = require('geocoder');
var nconf = require('nconf');
var router = require('express').Router({
  mergeParams: true
});
var isLoggedIn = require('lib/middleware/isLoggedIn');

client = Simplify.getClient({
  publicKey: nconf.get('SIMPLIFY_COMMERCE_PUBLIC'),
  privateKey: nconf.get('SIMPLIFY_COMMERCE_PRIVATE')
});

function processPayment(token, amount, referenceId, cb){
  //Multiply amount by 100 since 1000 = $10
  client.payment.create({
      amount : amount * 100,
      token : token,
      description : "payment description",
      reference : referenceId,
      currency : "USD"
  }, function(errData, data){
      if(errData){
          console.error("Error Message: " + errData.data.error.message);
          // handle the error
          cb(errData.data.error.message);
          return;
      }

      console.log("Payment Status: " + data.paymentStatus);
      cb(null, data.paymentStatus);
  });
}


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
        $near: location,
        $maxDistance: distance
      }
    }
  })
  .then(function() {
    Issue.find(query).lean().exec(function (err, issues) {
      if(err) return res.error(500, '6da1e876-6b97-4474-b515-b5cbfc93fef8');

      return res.ok(issues);
    })
  })
  .catch(function () {
    return res.error(500, 'de65c270-fb9b-4567-8294-b28f06b03ad3');
  })


});

module.exports = router;
