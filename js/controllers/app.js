var app = angular.module('myApp', ['myApp.services', 'myApp.supplier', 'ngResource', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('StoreController', ['$scope', 'showcaseService', 'alertsService', function($scope, showcaseService, alertsService) {

  //initial values
  $scope.issues = [];
  $scope.activePage = "suppliers";

  $scope.alerts = alertsService.getAlerts();

  $scope.issues = showcaseService.query({
    action: "Issues"
  }, function(data) {
    // do something after issues are loaded
  });

  $scope.goToPage = function(page) {
    $scope.activePage = page;
  };

  // colse alert
  $scope.closeAlert = function(index) {
    alertsService.closeAlert(index);
  };

  // Place a new order
  $scope.orderIssue = function(issue) {
    console.log("Ordering this issue " + issue);
    //do something here when orderIssue button is clicked
  };

}]);
