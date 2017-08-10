angular.module('myApp').factory('showcaseService', function($resource) {

  return $resource('http://frontendshowcase.azurewebsites.net/api/Suppliers');



});
