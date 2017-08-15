var app = angular.module('myApp');

app.controller('SupplierController', [ '$scope', 'showcaseService', function($scope, showcaseService){

      //initial values
      $scope.suppliers = [];
      $scope.editSupSelect = "";

      $scope.busyEditing = false;
      $scope.supplierBeingEditedId = [];

      $scope.busyDeleting = false;
      $scope.supplierIdBeingDeleted = -1;

      $scope.creatingNewSupplier = false;
      $scope.newSupplier = [];

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

      // create New Supplier
      $scope.createNewSupplier = function(supplier){
        $scope.creatingNewSupplier = true;
        $scope.newSupplier = {  name: '',
                                city: '',
                                reference: ''};
      };

      // Cancel New Supplier
      $scope.cancelNewSupplier = function(){
        $scope.creatingNewSupplier = false;
      };

      // submitEditedSupplier
      $scope.submitNewSupplier = function(supplier){
        var supplierPromise = showcaseService.save({action: "Suppliers"}, supplier);
        supplierPromise.$promise.then(function (data) {
             console.log("new supplier added");
             $scope.creatingNewSupplier = false;
        });
      };

}]);



app.controller('SupplierDeleteCtrl', function ($uibModal, $log, $document) {
  var $ctrl = this;
  $ctrl.items = ['item1', 'item2', 'item3'];  

  $ctrl.animationsEnabled = true;

  $ctrl.open = function (size, parentSelector) {
    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: './html/modalPlaceOrder.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {
        items: function () {
          return $ctrl.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $ctrl.openMultipleModals = function () {
    $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title-bottom',
      ariaDescribedBy: 'modal-body-bottom',
      templateUrl: 'stackedModal.html',
      size: 'sm',
      controller: function($scope) {
        $scope.name = 'bottom';
      }
    });

    $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title-top',
      ariaDescribedBy: 'modal-body-top',
      templateUrl: 'stackedModal.html',
      size: 'sm',
      controller: function($scope) {
        $scope.name = 'top';
      }
    });
  };

  $ctrl.toggleAnimation = function () {
    $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
  };

});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

app.controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
  var $ctrl = this;
  $ctrl.items = items;
  $ctrl.selected = {
    item: $ctrl.items[0]
  };

  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.selected.item);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
