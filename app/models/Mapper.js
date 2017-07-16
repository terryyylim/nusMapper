var mainApp = angular.module('myApp');

mainApp.factory('Mapper', ['Module','Gem', 'Core', 'Ue','Preclusion', 'Prerequisite',
 function(Module, Gem, Core, Ue, Preclusion, Prerequisite) {

 	Core.init();
	Gem.init();
	Ue.init();
	Preclusion.init();
	Prerequisite.init();

  var Mapper = {
  modules : [Core.modules, Gem.modules, Ue.modules],
  totalMC : 0,  // recursively add all baskets?
  message : "",
  /*
  selectedModule : false,
  selectedCourse : ""
  */
}

	console.log(Mapper.modules);
/*
	Module.getPrereq().then((data) => {
		//lexical this (comes with the arrow, ES6 function)
		Mapper.prereq = data;
	});
*/
/*
	Module.getCourseMods().then((data) => {
		Mapper.course = data;
	});
*/
/*
  Mapper.setCourse = (course) => {
  	Mapper.selectedCourse = course;
  	console.log(Mapper.selectedCourse);
  	//Parse in JSON data according to which course was selected
  }
*/
	Mapper.inMapper = (list, module) => {
		if(list == undefined){   // end of list
			return false;
		} else if(typeof list[0] === 'string' || list[0] instanceof String){ // if leaf
			return(angular.equals(list[0], module) || Mapper.inMapper(list.slice(0,1),module));
		} else{ //branch 
			return Mapper.inMapper(list[0], module) || Mapper.inMapper(list.slice(0,1), module);
		}
	}

	Mapper.updateMCCount = () => {
		Mapper.totalMC = Core.totalMC + Gem.totalMC + Ue.totalMC;
	}

	Mapper.add = (module, index) => {  
		//first check if already in mapper
		let inCheck = !Mapper.inMapper(Mapper.modules, module); // only add if not in mapper
		//then check if prereqs are satified
		let prereqCheck = Prerequisite.eval_hasPrereq(Mapper.modules, module);
		//then check that no preclus are present
		let precluCheck = !Preclusion.eval_hasPreclu(Mapper.modules, module); // only add if no preclu
		// only when all 3 checks pass
		if(inCheck && prereqCheck && precluCheck){
			// now check where to add it
			if(Core.add(module)){
				alert("module added to core!");
			} else if(Gem.add(module)){
				alert("module added to gem!");
			} else{
				Ue.add(module);
				alert("module added to ue!");
			}
			//update mc count
			Mapper.updateMCCount();
		} else{
			// use inCheck & prereqCheck & precluCheck to generate error message
			if(!inCheck){
				alert("You already have this module!");
			}
			if(!prereqCheck){
				alert("You have not cleared the prerequisite!");
			}
			if(!precluCheck){
				alert("You have a preclusion!");
			}
		}
	}
/*
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
*/
return Mapper;
}]);