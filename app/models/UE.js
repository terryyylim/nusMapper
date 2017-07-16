var mainApp = angular.module('myApp');

mainApp.factory('Ue', [function() {
  var Ue = {
  	totalMC : 0,
  	mods : []
  	
  };
  Ue.modules = [Ue.mods];
  Ue.init = () => {
  	console.log("Ue initted");
  }
return Ue;
}]);