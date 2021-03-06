var mainApp = angular.module('myApp');

//start of temporary array
var moduleList = [];

var mod1 = {"moduleCode":"CS1010","moduleTitle":"Programming Methodology","moduleCredit":"4"};
var mod2 = {"moduleCode":"CS1020","moduleTitle":"Data Structures and Algorithms I","moduleCredit":"4"};
var mod3 = {"moduleCode":"CS1231","moduleTitle":"Discrete Structures","moduleCredit":"4"};
var mod4 = {"moduleCode":"CS2010","moduleTitle":"Data Structures and Algorithms II","moduleCredit":"4"};
var mod5 = {"moduleCode":"CS2100","moduleTitle":"Computer Organisation","moduleCredit":"4"};
var mod6 = {"moduleCode":"CS2103T","moduleTitle":"Software Engineering","moduleCredit":"4"};
var mod7 = {"moduleCode":"CS2105","moduleTitle":"Introduction to Computer Networks","moduleCredit":"4"};
var mod8 = {"moduleCode":"CS2106","moduleTitle":"Introduction to Operating Systems","moduleCredit":"4"};
var mod9 = {"moduleCode":"CS3230","moduleTitle":"Design and Analysis of Algorithms","moduleCredit":"4"};

moduleList.push(mod1);
moduleList.push(mod2);
moduleList.push(mod3);
moduleList.push(mod4);
moduleList.push(mod5);
moduleList.push(mod6);
moduleList.push(mod7);
moduleList.push(mod8);
moduleList.push(mod9);
//end of temporary array

mainApp.factory('Mapper', ['Module', '$http', function(Module, $http) {

  var Mapper = {
  module : "",
  modules : [], 
  core : [], 
  csBD : [], 
  gem : [], 
  ue : [],
  preclusions: [],
  prereqList: [],
  totalMC : 0,
  coreMC : 0,
  csBDMC : 0,
  gemMC : 0,
  ueMC : 0,
  message : "",
  selectedModule : false,
  selectedCourse : ""
}

// init Prereq

	Module.getPrereq().then((data) => {
		//lexical this (comes with the arrow, ES6 function)
		Mapper.prereq = data;
	});

	Module.getCourseMods().then((data) => {
		Mapper.course = data;
	});

  //Mapper is an object with an attribute modules which is an empty array
  var mods = Mapper.modules; //mods is an array of modules, to count total MCs
  var core = Mapper.core; //core tracks core mods taken
  var csBD = Mapper.csBD; //BD tracks BD mods taken
  var gem = Mapper.gem; //gem tracks gem mods taken
  var ue = Mapper.ue; //ue tracks ue mods taken
  var m = Mapper;

  Mapper.setCourse = (course) => {
  	Mapper.selectedCourse = course;
  	console.log(Mapper.selectedCourse);
  	//Parse in JSON data according to which course was selected
  	if (angular.equals(Mapper.selectedCourse, "Business Analytics")) {
  			course = 1;
  		} else if (angular.equals(Mapper.selectedCourse, "Computer Science")) {
  			course = 2;
  		}

      switch(course) {
      case 1:
        /* Option 1:
        Choose 6 modules to make up 24MCs from Lists A,B and C, with at least
        2 modules each from Lists A and B. 5 of 6 modules must be at level-4000
        */

        /* Option 2:
        Choose BT4101 and 3 modules to make up 24MCs from Lists A,B and C,
        with at least 1 module each from Lists A and B. 2 of 3 modules must be
        at level-4000
        */
        // Can give user choice to select either option 1 or 2 first? Then, start considering conditions.
       $http.get("nusmods/bamods.json")
              .then(function(response){
                  moduleList = response.data;
                  //resolve(response.data);
                  console.log(moduleList);
              }).catch(function(error){
                  console.log("Got error!");
              });
        break;
      case 2:
        $http.get("nusmods/csmods.json")
              .then(function(response){
                  resolve(response.data);
                  console.log(moduleList);
              }).catch(function(error){
                  console.log("Got error!");
              });
        break;
    }
  }

  Mapper.add = (module, index) => {//add is a method of object Mapper
  	Mapper.prereqList = [];

  	var valid = addCheck(module);
  	var clearedPrerequisite = eval_hasPrereq(Mapper.prereq[index].prerequisite);
  	var clearedPreclusion = eval_hasPreclu(module,index);
  	var addedmc = parseInt(module.moduleCredit);

  	if(valid && clearedPrerequisite && !clearedPreclusion){
  		Mapper.selectedModule = false;
    	mods.push(module);
    	m.totalMC += addedmc;

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
		Mapper.selectedModule = true;
		module = module.moduleCode;
		console.log("omginvalid");
	}

	function addCheck(module){	// applies binary or to all filters
		console.log(inCore(module));
		console.log(inMapper(module));
		console.log(isCore(module));
		console.log(eval_hasPreclu(module,index));
		console.log(Mapper.prereq);
		console.log(Mapper.course.compulsory);
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
				//console.log("Got here!-preclu_1");
				return eval_hasPreclu(Mapper.prereq[index].preclusion.or[0],index) || eval_hasPreclu({"or" : Mapper.prereq[index].preclusion.or.splice(0,1)},index);
			} else {
				return eval_hasPreclu(Mapper.prereq[index].preclusion.or[0], index);
			}
		} else if(Mapper.prereq[index].preclusion.and) {	// recursive elif
			if(Mapper.prereq[index].preclusion.and.length > 1){
				//console.log("Got here!-preclu_1");
				return eval_hasPreclu(Mapper.prereq[index].preclusion.and[0],index) && eval_hasPreclu({"and" : Mapper.prereq[index].preclusion.and.splice(0,1)},index);
			} else {
				return eval_hasPreclu(Mapper.prereq[index].preclusion.and[0], index);
			}
		}
		 else {
			alert("error in input! -preclu");
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

	function eval_hasPrereq(prereq){  // v2
		console.log(prereq);
		//let prereq = Mapper.prereq[index].prerequisite === "undefined" ? 
		//				Mapper.Mapper.prereq[index].prerequisite : undefined;
		if(prereq === undefined){ //Base Case 1: No Prerequisites
			return true; //if true, means can take this module 
		} else if(angular.isString(prereq)){ //Base Case 2: Only 1 Prereq to begin with
			console.log(contains(prereq));
			return contains(prereq);
		} else if(prereq.or) {
			if(prereq.or.length > 1){
				return eval_hasPrereq(prereq.or[0]) || eval_hasPrereq({"or" : prereq.or.slice(1)});
			} else {
				console.log(eval_hasPrereq(prereq.or[0]));
				return eval_hasPrereq(prereq.or[0]);
			}
		} else if(prereq.and) {
			if(prereq.and.length > 1){
				//console.log("Got here!-preclu_1");
				return eval_hasPrereq(prereq.and[0]) && eval_hasPrereq({"and" : prereq.and.slice(1)});
			} else {
				return eval_hasPrereq(prereq.and[0]);
			}
		} else{
			alert("input error");
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