var app = angular.module('myApp', ['myApp.services', 'ngResource']);

app.controller('StoreController',[ '$scope', 'showcaseService', function($scope, showcaseService) {

    //initial values
    $scope.issues = [];
    $scope.activePage = "suppliers";

    $scope.issues = showcaseService.query({action: "Issues"}, function(data) {
        // do something after issues are loaded
    });

    // Set active page
    $scope.goToPage = function(page){
      $scope.activePage = page;
    };

    // Place a new order
    $scope.orderIssue = function(issue){
      console.log("Ordering this issue " + issue);
      //do something here when orderIssue button is clicked
    };

}]);

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
