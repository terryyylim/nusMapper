var mainApp = angular.module('myApp');

mainApp.factory('Gem', [function() {
  var Gem = {
  	totalMC : 0,
    gesMC: 0,
    getMC: 0,
    gerMC: 0,
    gehMC: 0,
    geqMC: 0,
  	pillars : [],
  	
  };
  Gem.modules = [Gem.pillars];
  Gem.init = () => {
  	console.log("Gem initted");
  }
  Gem.add = (module) => {
    console.log(module.moduleCode);
    let code = module.moduleCode;
    let added = false; 
    if(code.slice(0,2) == "GE"){
      if(code.slice(2,3) == "S" && Gem.gesMC === 0){
        console.log(module.moduleCredit);
        Gem.pillars.push(module);
        Gem.gesMC = Gem.gesMC + module.moduleCredit;
        added = true;
      } else if(code.slice(2,3) == "T" && Gem.getMC === 0){
        Gem.pillars.push(module);
        Gem.getMC = Gem.getMC + module.moduleCredit;
        added = true;
      } else if(code.slice(2,3) == "R" && Gem.gerMC === 0){
        Gem.pillars.push(module);
        Gem.gerMC = Gem.gerMC + module.moduleCredit;
        added = true;
      } else if(code.slice(2,3) == "H" && Gem.gehMC === 0){
        Gem.pillars.push(module);
        Gem.gehMC = Gem.gehMC + module.moduleCredit;
        added = true;
      } else if(code.slice(2,3) == "Q" && Gem.geqMC === 0){
        Gem.pillars.push(module);
        Gem.geqMC = Gem.geqMC + module.moduleCredit;
        added = true;
      } if(added){
        Gem.totalMC = Gem.gesMC + Gem.getMC + Gem.gerMC + Gem.gehMC + Gem.geqMC;
        return true;
      }else{
        return false;
      }
    }
  	return false;
  }
return Gem;
}]);