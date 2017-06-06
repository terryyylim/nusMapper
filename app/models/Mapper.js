var mainApp = angular.module('myApp');

//start of temporary array
var moduleList = [];

var mod1 = "{\"moduleCode\":\"ACC1002\",\"moduleTitle\":\"Financial Accounting\"}";
var mod2 = "{\"moduleCode\":\"ACC1002X\",\"moduleTitle\":\"Financial Accounting\"}";
var mod3 = "{\"moduleCode\":\"ACC1006\",\"moduleTitle\":\"Accounting Information Systems\"}";
var mod4 = "{\"moduleCode\":\"ACC2002\",\"moduleTitle\":\"Managerial Accounting\"}";

moduleList.push(mod1);
moduleList.push(mod2);
moduleList.push(mod3);
moduleList.push(mod4);
//end of temporary array

mainApp.factory('Mapper', [function() {
  var Mapper = {modules : [], core : [], csBD : [], gem : [], ue : []}; //Mapper is an object with an attribute modules which is an empty array
  var mods = Mapper.modules; //mods is an array of modules, to count total MCs
  var core = Mapper.core; //core tracks core mods taken
  var csBD = Mapper.csBD; //BD tracks BD mods taken
  var gem = Mapper.gem; //gem tracks gem mods taken
  var ue = Mapper.ue; //ue tracks ue mods taken

  Mapper.add = (module) => {//add is a method of object Mapper
  	var valid = addCheck(module);
  	if(valid){
    	mods.push(module);
    	if (isCore(module) && !inCore(module)){
    		core.push(module);
    	} else if(isGem(module) && !inGem(module)){
    		gem.push(module);
    	} else if(isGem(module) && !inGem(module) && samePillar(module)){
    		ue.push(module);
    	}
	} else{
		console.log("omginvalid");
	}

	function addCheck(module){	// applies binary or to all filters
		console.log(inCore(module));
		console.log(inMapper(module));
		console.log(isCore(module));
		return inMapper(module);
	}

	function inMapper(module){  // true is valid, false is invalid
		var added = false;
  		for(i = 0; i < mods.length; i++){
	  		if(mods[i] == module){
	  			added = true;
	  		}
  		}	
  	return !added;
	}

//START OF CORE MODULES CONDITIONS
	function isCore(module){
		for(i = 0; i < moduleList.length; i++){ //check if it is a core
			if(moduleList[i] == module){
				return true;
			}
		}
		return false;
	}

	function inCore(module){
		for(i = 0; i < core.length; i++){ //check if it has been added to core array yet
			if(core[i] == module){
				return true;
			}
		}
		return false;
	}
//END OF CORE MODULES CONDITIONS

//START OF GEM MODULES CONDITIONS
	function isGem(module){ //check if it is a GEM module
		var str = module.moduleCode;
		if(str.slice(0,3) == "GEH" || str.slice(0,3) == "GES" || str.slice(0,3) == "GET" || str.slice(0,3) == "GER" || str.slice(0,2) == "GEQ"){
			return true;
		}
		return false;
	}

	function inGem(module){ //check if already added into GEM module list
		for(i = 0; i < gem.length; i++){
			if(gem[i] == module){
				return true;
			}
		}
		return false;
	}

	function samePillar(module){ //check if same pillar GEM already taken
		var str = module.moduleCode;
		for(i = 0; i < gem.length; i++){
			if(str.slice(0,3) == gem[i].slice(0,3)){
				return true;
			}
		}
		return false;
	}

	function maxGem(module){ //check if already 5 modules worth of GEMs
		if(gemCount == 20){
			return true;
		}
		return false;
	}
//END OF GEM MODULES CONDITIONS
  }
  
  Mapper.remove = (index) => {
    mods.splice(index,1);
    core.splice(index,1);
  }

return Mapper;
}]);