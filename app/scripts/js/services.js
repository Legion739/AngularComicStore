var app = angular.module('myApp.services', []);

app.factory('showcaseService', function($resource) {
  return $resource('https://frontendshowcase.azurewebsites.net/api/:action/:id', {}, {
    update: {
      method: 'PUT' // this method issues a PUT request
    },
    delete: {
      method: 'DELETE'
    }
  });
});

app.factory('alertsService', function() {

  var myTest = "def";

  var alerts = [
    // { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    // { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
  ];

  return {
    getTest: function() {
      return myTest;
    },
    setTest: function(test) {
      myTest = test;
    },
    getAlerts: function() {
      return alerts;
    },
    addAlert: function(alertType, AlertMessage) {
      alerts.push({
        type: alertType,
        msg: AlertMessage
      });
    },
    closeAlert: function(index) {
      alerts.splice(index, 1);
    }
  };

})
