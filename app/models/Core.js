var mainApp = angular.module('myApp');

mainApp.factory('Core', ['$http', function($http) {
  var Core = {
  	totalMC : 0,
  	foundation : [],
  	specialization : [],
  	miscellaneous : [],
  	req : {}
    foundationMC : 0,
    specializationMC : 0,
    miscellaneousMC : 0
  };
  Core.modules = [Core.foundation, Core.specialization, Core.miscellaneous];
  Core.init = () => {
    $http.get("nusmods/csmods.json")
    .then((res) =>{
      Core.req = res.data;
    }).catch((err)=>{
      alert(err);
    });
  	console.log("Core initted");
  }
  Core.add = (module, contain) => {
    let added = false;
    if(contain(Core.req.foundation, module)){
      Core.foundation.push(module);
      Core.foundationMC = Core.foundationMC + module.moduleCredit;
      added = true;
    } else if(contain(Core.req.specialization, module)){
      Core.specialization.push(module);
      Core.specializationMC = Core.specializationMC + module.moduleCredit;
      added = true;
    } else if(contain(Core.req.miscellaneous, module)){
      Core.miscellaneous.push(module);
      Core.miscellaneousMC = Core.miscellaneousMC + module.moduleCredit;
      added = true;
    }
    if(added){
      Core.totalMC = Core.foundationMC + Core.specializationMC + Core.miscellaneousMC;
    } else{
  	 return false;
    }
  }
return Core;
}]);