var app = angular.module('myApp');

app.directive("suppliersDir", function() {
  return {
    restrict: 'E',
    templateUrl: "./html/suppliers.html"
  };
});
