var mainApp = angular.module('myApp');

mainApp.factory('Core', [function() {
  var Core = {
  	totalMC : 0,
  	foundation : [],
  	specialization : [],
  	miscellaneous : []
  	
  };
  Core.modules = [Core.foundation, Core.specialization, Core.miscellaneous];
  Core.init = () => {
  	console.log("Core initted");
  }
return Core;
}]);