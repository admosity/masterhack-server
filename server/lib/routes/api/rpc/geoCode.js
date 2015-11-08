var geocoder = require('geocoder');

var mongoose = require('mongoose');
var router = require('express').Router({ mergeParams: true });

router.get('/', function(req, res) {
  // Geocoding
  geocoder.geocode("Atlanta, GA", function ( err, data ) {
    // do something with data
    console.log("GEO CODE", err, data.results[0].geometry);
    res.ok(data.results[0].geometry);
  });
});

module.exports = router;
