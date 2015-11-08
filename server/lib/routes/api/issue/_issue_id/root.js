var router = require('express').Router({
  mergeParams: true
});
var isLoggedIn = require('lib/middleware/isLoggedIn');
var mongoose = require('mongoose');
var Issue = mongoose.model('Issue');


router.route('/')
  .get(function (req, res) {
    var amount = req.body.amount;
    var issueId = req.params.issue_id;

    Issue.findById(issueId).lean().exec(function (err, issue) {
      if(err) return res.error('58908dd9-969e-4e29-bf54-ba0e187d67c7');

      return res.ok(issue);
    });
  });

module.exports = router;
