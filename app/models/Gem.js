var mainApp = angular.module('myApp');

mainApp.factory('Gem', [function() {
  var Gem = {
  	totalMC : 0,
  	pillars : [],
  	
  };
  Gem.modules = [Gem.pillars];
  Gem.init = () => {
  	console.log("Gem initted");
  }
return Gem;
}]);