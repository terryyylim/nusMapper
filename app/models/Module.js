var mainApp = angular.module('myApp');

mainApp.factory('Module', ['$http', '$q', function($http,$q) {
  var Module = {};

  Module.getMods = function(){ 
    return $q(function(resolve,reject){
        $http.get("nusmods/modinfo.json")
        .then(function(response){
          resolve(response.data);
        }).catch(function(error){
          reject(error);
        });
      });
    }

    Module.getPrereq = () => {
      return $q(function(resolve,reject){
        $http.get("nusmods/prereq.json")
        .then(function(response){
          resolve(response.data);
        }).catch(function(error){
          reject(error);
        });
      });
    }

    Module.getCourseMods = () => {
      return $q(function(resolve,reject){
        $http.get("nusmods/csmods.json")
        .then(function(response){
          resolve(response.data);
        }).catch(function(error){
          reject(error);
        });
      });
    }
    
return Module;
}]);

