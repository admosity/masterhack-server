var router = require('express').Router({
  mergeParams: true
});
var isLoggedIn = require('lib/middleware/isLoggedIn');
var mongoose = require('mongoose');
var Issue = mongoose.model('Issue');


router.route('/')
  .post(isLoggedIn, function (req, res) {
    var amount = req.body.amount;
    var issueId = req.params.issue_id;


    Issue.findByIdAndUpdate(issueId, {
      $inc: {
        pledged: amount
      },
      $push: {
        pledgers: {
          who: req.user,
          amount: amount,
        }
      }
    }, {new: true}).lean().exec(function (err, issue) {
      if(err) return res.error('162817d2-4916-4408-87fb-87a0de6f2202');
      // TODO: Add payment
      
      return res.ok(issue);
    });
  });
