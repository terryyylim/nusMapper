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
    console.log(Ue.modules);
  	Ue.totalMC = Ue.totalMC + parseInt(module.moduleCredit);
  	console.log(Ue.totalMC);
  }
return Ue;
}]);