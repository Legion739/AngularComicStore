var app = angular.module('myApp', ['ngResource']);
app.controller('StoreController',[ '$scope', '$http', 'showcaseService', function($scope, $http, showcaseService) {

    //initial values
    $scope.suppliers = [];
    $scope.orders = [];
    $scope.issues = [];
    $scope.activePage = "suppliers";
    $scope.editSupSelect = "";

    $scope.busyEditing = false;
    $scope.supplierBeingEditedId = [];

    $scope.suppliers = showcaseService.query(function() {
      // Do something after service retruns data
    });


    /* // Code that can be used to get a specific supplier by ID
    $scope.editSupSelect = showcaseService.get({ id: 15 }, function() {
      console.log($scope.editSupSelect);
    });*/



    //get orders - TODO move to factory
    $http.get('http://frontendshowcase.azurewebsites.net/api/Orders')
    .then(function(orders) {
        $scope.orders = orders.data;
    });

    //get issues - TODO move to factory
    $http.get('http://frontendshowcase.azurewebsites.net/api/Issues')
    .then(function(issues) {
        $scope.issues = issues.data;
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

    // Edit Supplier
    $scope.editSupplier = function(supplier){
      $scope.busyEditing = true;
      $scope.supplierBeingEditedId = supplier
      console.log("Editing this supplier " + supplier.id);
      //do something here when edit supplier is clicked
    };

    // Cancel Supplier Edit
    $scope.cancelSupplierEdit = function(){
      $scope.busyEditing = false;
      $scope.supplierBeingEditedId = [];
    };

    // submitEditedSupplier
    // TODO this is actually submiting a new supervisor and not updating an existing one.
    $scope.submitEditedSupplier = function(supplier){
      //Use the resource to add a new Supplier
      supplier.id = '';
      var editSupplierPromise = showcaseService.save({}, supplier);
      editSupplierPromise.$promise.then(function (data) {
           console.log(data);
           $scope.busyEditing = false;
      });

    };



}]);
