var mainApp = angular.module('myApp');

//start of temporary array
var moduleList = [];

var mod1 = {"moduleCode":"ACC1002","moduleTitle":"Financial Accounting","moduleCredit": "4"};
var mod2 = {"moduleCode":"ACC1002X","moduleTitle":"Financial Accounting","moduleCredit": "4"};
var mod3 = {"moduleCode":"ACC1006","moduleTitle":"Accounting Information Systems","moduleCredit": "4"};
var mod4 = {"moduleCode":"ACC2002","moduleTitle":"Managerial Accounting","moduleCredit": "4"};

moduleList.push(mod1);
moduleList.push(mod2);
moduleList.push(mod3);
moduleList.push(mod4);
//end of temporary array

mainApp.factory('Mapper', ['Module', function(Module) {

  var Mapper = {
  modules : [], 
  core : [], 
  csBD : [], 
  gem : [], 
  ue : [],
  totalMC : 0,
  coreMC : 0,
  csBDMC : 0,
  gemMC : 0,
  ueMC : 0,
  message : "",
  }; 
// init Prereq

	Module.getPrereq().then((data) => {
		//lexical this (comes with the arrow, ES6 function)
		Mapper.prereq = data;
	});

  //Mapper is an object with an attribute modules which is an empty array
  var mods = Mapper.modules; //mods is an array of modules, to count total MCs
  var core = Mapper.core; //core tracks core mods taken
  var csBD = Mapper.csBD; //BD tracks BD mods taken
  var gem = Mapper.gem; //gem tracks gem mods taken
  var ue = Mapper.ue; //ue tracks ue mods taken
  var m = Mapper;

  Mapper.add = (module, index) => {//add is a method of object Mapper
  	
  	console.log(clearedPreclusion(module,index));

  	var valid = addCheck(module);
  	var addedmc = parseInt(module.moduleCredit);
  	if(valid){
    	mods.push(module);
    	m.totalMC += addedmc;
    	if (isCore(module) && !inCore(module)){ //&& !clearedPreclusion(module)
    		core.push(module);
    		m.coreMC += addedmc;
    	} else if(!isCore(module) && !isGem(module)){
    		ue.push(module);
    		m.ueMC += addedmc;
    	} else if(isGem(module) && !inGem(module) && m.gemMC < 20 && !samePillar(module)){
    		gem.push(module);
    		m.gemMC += addedmc;
    	} else{
    		ue.push(module);
    		m.ueMC += addedmc;
    		console.log("fku");
    	}
	} else{
		console.log("omginvalid");
	}

	function addCheck(module){	// applies binary or to all filters
		console.log(inCore(module));
		console.log(inMapper(module));
		console.log(isCore(module));
		//console.log(Mapper.prereq[0].preclusion);
		return inMapper(module);
	}

	function inMapper(module){  // true is valid, false is invalid
		var added = false;
  		for(i = 0; i < mods.length; i++){
	  		if(angular.equals(mods[i],module)){
	  			added = true;
	  		}
  		}	
  	return !added;
	}

//START OF CORE MODULES CONDITIONS
	function isCore(module){
		for(i = 0; i < moduleList.length; i++){ //check if it is a core
			if(angular.equals(moduleList[i],module)){
				return true;
			}
		}
		return false;
	}

	function inCore(module){
		for(i = 0; i < core.length; i++){ //check if it has been added to core array yet
			if(angular.equals(core[i],module)){
				return true;
			}
		}
		return false;
	}
//END OF CORE MODULES CONDITIONS

//START OF GEM MODULES CONDITIONS
	function isGem(module){ //check if it is a GEM module
		var str = module.moduleCode;
		if((str.slice(0,3) == "GEH") || (str.slice(0,3) == "GES") || (str.slice(0,3) == "GET") || str.slice(0,3) == "GER" || str.slice(0,2) == "GEQ"){
			return true;
		}
		return false;
	}

	function inGem(module){ //check if already added into GEM module list
		for(i = 0; i < gem.length; i++){
			if(angular.equals(gem[i],module)){
				return true;
			}
		}
		return false;
	}

	function samePillar(module){ //check if same pillar GEM already taken
		var str = module.moduleCode;
		for(i = 0; i < gem.length; i++){
			if(str.slice(0,3) == gem[i].moduleCode.slice(0,3)){
				return true;
			}
		}
		return false;
	}

	function maxGem(module){ //check if already 5 modules worth of GEMs
		if(m.gemMC == 20){
			return true;
		}
		return false;
	}
//END OF GEM MODULES CONDITIONS

//START OF PRE-REQUISITE CONDITIONS
	function clearedPreclusion(module, index){
		if (!('preclusion' in Mapper.prereq[index])){
			return true; //true means no preclusion, can take the mod
		} else if ('preclusion' in Mapper.prereq[index]) {
			for (i = 0; i < mods.length; i++){
				for (j = 0; j < Mapper.prereq[index].preclusion; j++){
					if (mods[i] == Mapper.prereq[index].preclusion[j]){
						return false; //false means already cleared preclusion and cannot take this mod
					}
				}
			}
			return true;
		}
		/*var prereq = Mapper.prereq[index].preclusion; //in prerequisite list
		console.log(prereq);
		for(i = 0; i < prereq.length; i++){ //how to retrieve array of prerequisites
			for(j = 0; j < mods.length; j++){
				if(angular.equals(prereq[i],mods[j])){
					return true;
				}
			}
		}
		return false;*/
	}

//END OF PRE-REQUISITE CONDITIONS
  }
  
//REMOVE FUNCTIONS
  Mapper.remove = (index) => {
    var removed = mods.splice(index,1)[0];
    var removedmc = parseInt(removed.moduleCredit);
    for(i = 0; i < core.length; i++){
    	if(angular.equals(core[i], removed)){
    		core.splice(i,1);
    		m.coreMC = m.coreMC - removedmc;
    	}
    }for(i = 0; i < ue.length; i++){
    	if(angular.equals(ue[i], removed)){
    		ue.splice(i,1);
    		m.ueMC = m.ueMC - removedmc;
    	}
    	
    }for(i = 0; i < gem.length; i++){
    	if(angular.equals(gem[i], removed)){
    		gem.splice(i,1);
    		m.gemMC = m.gemMC - removedmc;
    	}	
    }
    m.totalMC -= removedmc;
  }
//END OF REMOVE FUNCTIONS

return Mapper;
}]);