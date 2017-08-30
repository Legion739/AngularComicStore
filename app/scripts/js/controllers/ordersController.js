angular.module('myApp.orders', ['myApp.services']);

app.controller('OrdersController', ['$scope', 'showcaseService', '$uibModal', function($scope, showcaseService, $uibModal){

  //initial values
  $scope.issues = [];

  $scope.issues = showcaseService.query({
    action: "Issues"
  }, function(data) {
    // do something after issues are loaded
  });

  // Place a new order
  $scope.orderIssue = function(issue) {
    console.log("Ordering this issue " + issue);
    //do something here when orderIssue button is clicked
  };

  // Place Order
  $scope.openPlaceOrderModal = function(issue) {
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: './views/modalPlaceOrder.html',
      controller: 'ModalPlaceOrderInstanceCtrl',
      controllerAs: '$ctrl',
      resolve: {
        issue: issue
      }
    });

    modalInstance.result.then(function() {
      //do something after modal close
    }, function() {
      //console.log("Modal dismissed" );
    });
  };

}]);


app.controller('ModalPlaceOrderInstanceCtrl', ['$uibModalInstance', 'showcaseService', 'issue', function($uibModalInstance, showcaseService, issue) {
  var $ctrl = this;
  $ctrl.issue = issue

  $ctrl.suppliers = [];
  $ctrl.suppliers = showcaseService.query({
    action: "Suppliers"
  }, function(data) {
    // Do something after suppliers return
  });

  // no API call availible to get these values
  $ctrl.quality = ['Mint', 'NearMintMint', 'NearMint', 'VeryFineNearMint', 'VeryFine', 'FineVeryFine', 'Fine', 'VeryGoodFine', 'VeryGood', 'GoodVeryGood', 'Good', 'FairGood', 'Fair', 'Poor'];

  $ctrl.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

  $ctrl.submitPlaceOrder = function(order) {
    // Nothing happens here, the API is broken
      console.log(order);
      $uibModalInstance.close();
  };

}]);
