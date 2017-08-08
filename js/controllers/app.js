var app = angular.module('myApp', []);
app.controller('StoreController',[ '$scope', '$http', function($scope, $http) {

    //initial values
    $scope.suppliers = [];
    $scope.activePage = "placeOrder";

    // get suppliers
    $http.get('http://frontendshowcase.azurewebsites.net/api/Suppliers')
    .then(function(suppliers) {
        $scope.suppliers = suppliers.data;
    });

    // Set active page
    $scope.goToPage = function(page){
      $scope.activePage = page;
    };


}]);
