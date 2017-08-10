angular.module('myApp').factory('showcaseService', function($resource) {

  //return $resource('http://frontendshowcase.azurewebsites.net/api/Suppliers');
  return $resource('http://frontendshowcase.azurewebsites.net/api/Suppliers', {}, {
      update: {
        method: 'PUT' // this method issues a PUT request
      },
      delete: {
        method: 'DELETE'
      }
    });

});
