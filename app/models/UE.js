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
  Ue.add = (module) => {
  	Ue.mods.push(module);
  	Ue.totalMC = Ue.totalMC + parseInt(JSON.parse(module).moduleCredit);
  	console.log(Ue.totalMC);
  }
return Ue;
}]);