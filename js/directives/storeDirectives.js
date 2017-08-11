var app = angular.module('myApp');

app.directive("suppliersDir", function() {
  return {
    restrict: 'E',
    templateUrl: "./html/suppliers.html"
  };
});

app.directive("aboutPage", function() {
  return {
    restrict: 'E',
    templateUrl: "./html/about.html"
  };
});

app.directive("plaveOrder", function() {
  return {
    restrict: 'E',
    templateUrl: "./html/placeOrder.html"
  };
});
