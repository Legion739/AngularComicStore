var app = angular.module('myApp', []);
app.controller('StoreController',[ '$scope', '$http', function($scope, $http) {

    $scope.testVar = "It's Alive !!";
    $scope.suppliers = [];

    // get suppliers
    $http.get('http://frontendshowcase.azurewebsites.net/api/Suppliers')
    .then(function(suppliers) {
        $scope.suppliers = suppliers.data;
    });


}]);
