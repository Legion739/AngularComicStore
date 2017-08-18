var app = angular.module('myApp', ['myApp.services', 'myApp.orders', 'myApp.supplier', 'ngResource', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('StoreController', ['$scope', 'showcaseService', 'alertsService', function($scope, showcaseService, alertsService) {

  //initial values
  $scope.activePage = "suppliers";
  $scope.alerts = alertsService.getAlerts();

  $scope.goToPage = function(page) {
    $scope.activePage = page;
  };

  // colse alert
  $scope.closeAlert = function(index) {
    alertsService.closeAlert(index);
  };

}]);
