angular.module('myApp').factory('showcaseService', function($resource) {
  return $resource('http://frontendshowcase.azurewebsites.net/api/:action/:id', {}, {
      update: {
        method: 'PUT' // this method issues a PUT request
      },
      delete: {
        method: 'DELETE'
      }
    });
});
