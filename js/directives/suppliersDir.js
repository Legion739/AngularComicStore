var app = angular.module('myApp', ['ngResource']);

app.directive("suppliersDir", function() {
  return {
    restrict: 'E',
    templateUrl: "./html/suppliers.html"
  };
});
