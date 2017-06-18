var mainApp = angular.module('myApp');

//start of temporary array
var moduleList = [];

var mod1 = {"moduleCode":"ACC1002","moduleTitle":"Financial Accounting","moduleCredit": "4"};
var mod2 = {"moduleCode":"ACC1002X","moduleTitle":"Financial Accounting","moduleCredit": "4"};
var mod3 = {"moduleCode":"ACC1006","moduleTitle":"Accounting Information Systems","moduleCredit": "4"};
var mod4 = {"moduleCode":"ACC2002","moduleTitle":"Managerial Accounting","moduleCredit": "4"};
var mod5 = {"moduleCode":"ZB4171","moduleTitle":"Advanced Topics in Bioinformatics","moduleCredit": "4"}

moduleList.push(mod1);
moduleList.push(mod2);
moduleList.push(mod3);
moduleList.push(mod4);
moduleList.push(mod5);
//end of temporary array

mainApp.factory('Mapper', ['Module', function(Module) {

  var Mapper = {
  modules : [], 
  core : [], 
  csBD : [], 
  gem : [], 
  ue : [],
  preclusions: [],
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
  var preclu = Mapper.preclusions;
  var m = Mapper;

  Mapper.add = (module, index) => {//add is a method of object Mapper

  	var valid = addCheck(module);
  	var clearedPrerequisite = eval_hasPrereq(module,index);
  	var clearedPreclusion = eval_hasPreclu(module,index);
  	var addedmc = parseInt(module.moduleCredit);

  	if(valid && clearedPrerequisite && !clearedPreclusion){
    	mods.push(module);
    	m.totalMC += addedmc;
    	console.log(preclu);
    	if (isCore(module) && !inCore(module)){
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
		console.log(eval_hasPreclu(module,index));
		//console.log(eval_hasPrereq(module, index));
		//console.log(inMapper(Mapper.prereq)); //LSM2241 for testing
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

//START OF PRECLUSION CONDITIONS
	function eval_hasPreclu(module, index){
		var checker = false;
		//console.log(Mapper.prereq[index].preclusion);
		if(angular.isString(module)){ //Base Case 1: 1 Preclu left
			return contains(module); //if true, means cannot take this module anymore
		} else if(angular.isString(Mapper.prereq[index].preclusion)){ //Base Case 2: Only 1 Preclu to begin with
			return contains(Mapper.prereq[index].preclusion);
		} else if(typeof Mapper.prereq[index].preclusion === "undefined"){ //Base Case 3: No Preclu
			console.log("No Preclusions");
			return false; //No Preclusions, so able to just take the module
		} else if(Mapper.prereq[index].preclusion.or) {
			if(Mapper.prereq[index].preclusion.or.length > 1){
				console.log("Got here!-preclu_1");
				return eval_hasPreclu(Mapper.prereq[index].preclusion.or[0],index) || eval_hasPreclu({"or" : Mapper.prereq[index].preclusion.or.splice(0,1)},index);
			} else {
				return contains(Mapper.prereq[index].preclusion.or[0]);
			}
		} else if(Mapper.prereq[index].preclusion.and){
			for(i = 0; i < Mapper.prereq[index].preclusion.and.length; i++){
				for(j = 0; j < mods.length; j++){
					if(angular.equals(Mapper.prereq[index].preclusion.and[i],mods[j].moduleCode)){
					checker = false;
				} else {
					checker = true; 
					break; //once a module is not in the 'mods' array, means can take
				}	
			}
		}
			return checker; //if false, means can take module as not all modules are in 'mods' array
		} else {
			alert("error in input! -preclu")
		}
	}

//END OF PRECLUSION CONDITIONS

//START OF PRE-REQUISITE CONDITIONS
	function contains(module){
		var added = false;
		for (i = 0; i < mods.length; i++){
			if(angular.equals(module,mods[i].moduleCode)){
				added = true;
			}
		}
		return added;
	}

	/*
	Expected input: prerequisite param of module, either a string or a json object
	output: true if module can be added, false if otherwise
	*/
	function eval_hasPrereq(module, index){
		var checker = false;

		if(angular.isString(module)){ //Base Case 1: 1 Prereq left
			console.log("got here!-prereq_1");
			console.log(contains(module));
			return contains(module);
		} else if(angular.isString(Mapper.prereq[index].prerequisite)){ //Base Case 2: Only 1 Prereq to begin with
			return contains(Mapper.prereq[index].prerequisite);
		} else if(typeof Mapper.prereq[index].prerequisite === "undefined"){ //Base Case 3: No Prereq
			console.log("No Pre-requisites");
			return true;
		} else if(Mapper.prereq[index].prerequisite.or){ //Module has Prereqs that are type 'or'
			if(Mapper.prereq[index].prerequisite.or.length >1){ //More than 1 Prereq nested in 'or'
				console.log("got here!-prereq_2");
				return eval_hasPrereq(Mapper.prereq[index].prerequisite.or[0],index) || eval_hasPrereq({"or" : Mapper.prereq[index].prerequisite.or.splice(0,1)},index);
			} else{ //Only 1 prereq in 'or'
				console.log("got here!-prereq_3");
				console.log(Mapper.prereq[index].prerequisite.or[0]);
				return contains(Mapper.prereq[index].prerequisite.or[0]);
			}
		} else if(Mapper.prereq[index].prerequisite.and){ //Module has Prereqs that are type 'and'
			if(Mapper.prereq[index].prerequisite.and.length >1){ //More than 1 Prereq nested in 'and'
				for (i = 0; i < Mapper.prereq[index].prerequisite.and.length; i++){
					if(Mapper.prereq[index].prerequisite.and[i].or){ //'or' nested within 'and'
						console.log("got here!-prereq_6");
						for(j = 0; j < Mapper.prereq[index].prerequisite.and[i].or.length; j++){
							for(k = 0; k < mods.length; k++){
								if(angular.equals(Mapper.prereq[index].prerequisite.and[i].or[j],mods[k])){
									checker = true;
								}
							}
						}
						return checker;
					} else {
						console.log("got here!-prereq_4");
						return eval_hasPrereq(Mapper.prereq[index].prerequisite.and[0],index) || eval_hasPrereq({"and" : Mapper.prereq[index].prerequisite.and.splice(0,1)},index);
					}
				}
			} else{ //Only 1 prereq in 'and'
				console.log("got here!-prereq_5");
				return contains(Mapper.prereq[index].prerequisite.and[0]);
			}
		} else{
			alert("error in input! -prereq");
		}
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