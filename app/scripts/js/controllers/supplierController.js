var app = angular.module('myApp.supplier', ['myApp.services']);

app.controller('SupplierController', ['$scope', 'showcaseService', '$uibModal', '$document', function($scope, showcaseService, $uibModal, $document) {

  //initial values
  $scope.suppliers = [];

  $scope.SuppCurrentPage = 0;
  $scope.SuppPageSize = 10;
  getSuppliers();

  // get Suppliers
  function getSuppliers() {
    $scope.suppliers = showcaseService.query({
      action: "Suppliers"
    }, function(data) {
      $scope.numberOfPages = function() {
        return Math.ceil(data.length / $scope.SuppPageSize);
      }
    });
  };


  // Edit Supplier
  $scope.openEditModal = function(supplier) {
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: './views/modalEditSup.html',
      controller: 'ModalSuppEditInstanceCtrl',
      controllerAs: '$ctrl',
      resolve: {
        supplier: supplier
      }
    });

    modalInstance.result.then(function() {
      getSuppliers();
    }, function() {
      //console.log("Modal dismissed" );
    });
  };


  // Delete Supplier
  $scope.openDeleteModal = function(suppId) {
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'deleteSupp.html',
      controller: 'ModalSuppDeleteInstanceCtrl',
      controllerAs: '$ctrl',
      resolve: {
        suppId: suppId
      }
    });

    modalInstance.result.then(function() {
      getSuppliers();
    }, function() {
      //console.log("Modal dismissed" );
    });
  };

}]);

app.controller('ModalSuppDeleteInstanceCtrl', ['$uibModalInstance', 'showcaseService', 'suppId', 'alertsService', function($uibModalInstance, showcaseService, suppId, alertsService) {
  var $ctrl = this;
  $ctrl.suppId = suppId

  $ctrl.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

  $ctrl.deleteSupplierConfirm = function() {
    // Code that can be used to delete a specific supplier by ID
    showcaseService.delete({
      action: "Suppliers",
      id: $ctrl.suppId
    }, function() {
      alertsService.addAlert('success', 'Successfully deleted Supplier ' +  $ctrl.suppId);
      $uibModalInstance.close();
    }, function(error) {
      alertsService.addAlert('danger', 'Oh snap! something went wrong trying to Delete the Supplier.');
      $uibModalInstance.close();
      return error;
    });
  };

}]);

app.controller('ModalSuppEditInstanceCtrl', ['$uibModalInstance', 'showcaseService', 'supplier', 'alertsService', function($uibModalInstance, showcaseService, supplier, alertsService) {
  var $ctrl = this;
  $ctrl.supplier = angular.copy(supplier);

  $ctrl.editSupplier = function(supplier) {
    var editSupplierPromise = showcaseService.update({}, supplier);
    editSupplierPromise.$promise.then(function(data) {
      alertsService.addAlert('success', 'Successfully edited Supplier');
      $uibModalInstance.close();
    }, function(error) {
      alertsService.addAlert('danger', 'Oh snap! something went wrong trying to Edit the Supplier.');
      $uibModalInstance.close();
      return error;
    });
  };

  $ctrl.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

}]);

// Pagination Filter
app.filter('startFrom', function() {
  return function(input, start) {
    start = +start; //parse to int
    return input.slice(start);
  }
});
