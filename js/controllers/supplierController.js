var app = angular.module('myApp.supplier', ['myApp.services']);

app.controller('SupplierController', [ '$scope', 'showcaseService', '$uibModal', '$document', function($scope, showcaseService, $uibModal, $document){

      //initial values
      $scope.suppliers = [];

      $scope.SuppCurrentPage = 0;
      $scope.SuppPageSize = 10;

      $scope.suppliers = showcaseService.query({action: "Suppliers"}, function(data) {
        // Do something after service retruns data
        $scope.numberOfPages=function(){
            return Math.ceil(data.length/$scope.SuppPageSize);
        }
      });

      // Edit Supplier
      $scope.openEditModal = function (supplier) {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: './html/modalEditSup.html',
          controller: 'ModalSuppEditInstanceCtrl',
          controllerAs: '$ctrl',
          resolve: {
            supplier: supplier
          }
        });

        modalInstance.result.then(function () {}, function () {
          //console.log("Modal dismissed" );
        });
      };


      // Delete Supplier
      $scope.openDeleteModal = function (suppId) {
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

        modalInstance.result.then(function () {}, function () {
          //console.log("Modal dismissed" );
        });
      };

}]);

app.controller('ModalSuppDeleteInstanceCtrl',['$uibModalInstance', 'showcaseService', 'suppId', function ($uibModalInstance, showcaseService, suppId) {
  var $ctrl = this;
  $ctrl.suppId = suppId

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $ctrl.deleteSupplierConfirm = function(){
    // Code that can be used to delete a specific supplier by ID
    showcaseService.delete({action: "Suppliers", id: $ctrl.suppId }, function() {
      console.log("You have deleted Supplier " + $ctrl.suppId);
      $uibModalInstance.close();
    });
  };

}]);

app.controller('ModalSuppEditInstanceCtrl',['$uibModalInstance', 'showcaseService', 'supplier', function ($uibModalInstance, showcaseService, supplier) {
  var $ctrl = this;
  $ctrl.supplier = supplier

  // TODO This is broken now for some reason....
  $ctrl.editSupplier = function(supplier){
    var editSupplierPromise = showcaseService.update({}, supplier);
    editSupplierPromise.$promise.then(function (data) {
         console.log(data);
         console.log("You have edited Supplier ");
         $uibModalInstance.close();
    });
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

}]);

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
