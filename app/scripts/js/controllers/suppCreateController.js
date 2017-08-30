var app = angular.module('myApp.supplier');

app.controller('SupplierCreateCtrl', function($uibModal, $document) {
  var $ctrl = this;

  $ctrl.openCreateModal = function(size, parentSelector) {
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: './views/modalCreateSup.html',
      controller: 'ModalSuppCreateInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      resolve: {}
    });

    modalInstance.result.then(function() {
      //modal dismissed
    }, function() {
      console.log("Modal dismissed");
    });
  };

});

app.controller('ModalSuppCreateInstanceCtrl', ['$uibModalInstance', 'showcaseService', 'alertsService', function($uibModalInstance, showcaseService, alertsService) {
  var $ctrl = this;

  $ctrl.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

  // submitEditedSupplier
  $ctrl.submitNewSupplier = function(supplier) {
    var supplierPromise = showcaseService.save({
      action: "Suppliers"
    }, supplier);
    supplierPromise.$promise.then(function(data) {
      alertsService.addAlert('success', 'Successfully added new supplier ');
      $uibModalInstance.close();
    },function(error){
      alertsService.addAlert('danger',  'Oh snap! something went wrong trying to Create a Supplier.');
      $uibModalInstance.close();
      return error;
    });
  };

}]);
