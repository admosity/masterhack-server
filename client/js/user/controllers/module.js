
var app = angular.module('App.controllers', [])

app.controller("AppCtrl", function($scope) {

})

app.controller("PledgeCtrl", function($scope, $http) {
	 // $("#simplify-payment-form").on("submit", function() {
  //           // Disable the submit button
  //           $("#process-payment-btn").attr("disabled", "disabled");
  //           // Generate a card token & handle the response
  //           SimplifyCommerce.generateToken({
  //               key: "YOUR_PUBLIC_KEY",
  //               card: {
  //                   number: $("#cc-number").val(),
  //                   cvc: $("#cc-cvc").val(),
  //                   expMonth: $("#cc-exp-month").val(),
  //                   expYear: $("#cc-exp-year").val()
  //               }
  //           }, simplifyResponseHandler);
  //           // Prevent the form from submitting
  //           return false;
  //       });

	$scope.card = {};

	$scope.submit = function() {
        SimplifyCommerce.generateToken({
            key: "YOUR_PUBLIC_KEY",
            card: $scope.card
        }, function(data) {
            if(data.error) {

            } else {
                $scope.card.token = data.token;
                
                $http.post("/pledge", $scope.card)
                .success(function(res) {

                })
                .catch(function(err) {

                });
            }
        });
	};
})
;

module.exports = app;