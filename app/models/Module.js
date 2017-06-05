var mainApp = angular.module('myApp');

mainApp.factory('Module', ['$http', '$q', function($http,$q) {
  var Module = {};

  Module.getMods = function(){ 
      return $q(function(resolve,reject){
        $http.get("orbital.json")
        .then(function(response){
          resolve(response.data);
        }).catch(function(error){
          reject(error);
        });
      });
    }
return Module;
}]);

