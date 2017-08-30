var app = angular.module('myApp');

app.directive("suppliersDir", function() {
  return {
    restrict: 'E',
    templateUrl: "./views/suppliers.html"
  };
});

app.directive("aboutPage", function() {
  return {
    restrict: 'E',
    templateUrl: "./views/about.html"
  };
});

app.directive("placeOrder", function() {
  return {
    restrict: 'E',
    templateUrl: "./views/placeOrder.html"
  };
});
