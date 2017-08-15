var app = angular.module('myApp.supplier', ['myApp.services']);

app.controller('SupplierController', [ '$scope', 'showcaseService', function($scope, showcaseService){

      //initial values
      $scope.suppliers = [];
      $scope.editSupSelect = "";

      $scope.busyEditing = false;
      $scope.supplierBeingEditedId = [];

      $scope.busyDeleting = false;
      $scope.supplierIdBeingDeleted = -1;

      $scope.SuppCurrentPage = 0;
      $scope.SuppPageSize = 10;

      $scope.suppliers = showcaseService.query({action: "Suppliers"}, function(data) {
        // Do something after service retruns data
        $scope.numberOfPages=function(){
            return Math.ceil(data.length/$scope.SuppPageSize);
        }
      });

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
      $scope.submitEditedSupplier = function(supplier){
        var editSupplierPromise = showcaseService.update({}, supplier);
        editSupplierPromise.$promise.then(function (data) {
             console.log(data);
             $scope.busyEditing = false;
        });
      };

      //delete supplier
      $scope.deleteSupplier = function(supplierID){
        $scope.supplierIdBeingDeleted = supplierID;
        $scope.busyDeleting = true;

      };

      //delete confirmation
      $scope.deleteSupplierConfirm = function(){
        // Code that can be used to delete a specific supplier by ID
        $scope.editSupSelect = showcaseService.delete({action: "Suppliers", id: $scope.supplierIdBeingDeleted }, function() {
          $scope.busyDeleting = false;
          console.log("You have deleted Supplier " + $scope.supplierIdBeingDeleted);
          $scope.supplierIdBeingDeleted = -1;

        });

      };

      //delete cancel
      $scope.deleteSupplierCancel = function(){
        $scope.busyDeleting = false;
      };

}]);

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
