var mainApp = angular.module('myApp');

mainApp.factory('Mapper', [function() {
  var Mapper = {modules : []};

  Mapper.add = (module) => {
    Mapper.modules.push(module); 
  }
  
  Mapper.remove = (index) => {
    Mapper.modules.splice(index,1);
  }

return Mapper;
}]);

