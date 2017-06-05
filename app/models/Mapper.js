var mainApp = angular.module('myApp');

mainApp.factory('Mapper', [function() {
  var Mapper = {modules : [], core : [], csBD : [], gem : [], ue : []}; //Mapper is an object with an attribute modules which is an empty array
  var mods = Mapper.modules; //mods is an array of modules, to count total MCs
  var core = Mapper.core; //core tracks core mods taken
  var core = Mapper.csBD; //BD tracks BD mods taken
  var gem = Mapper.gem; //gem tracks gem mods taken
  var ue = Mapper.ue; //ue tracks ue mods taken

  Mapper.add = (module) => {//add is a method of object Mapper
  	var valid = addCheck(module);
  	if(valid){
    	mods.push(module);
    	if (inCore(module)){
    		core.push(module);
    	}
	} else{
		console.log("omginvalid");
	}

	function addCheck(module){	// applies binary or to all filters
		return inMapper(module) && inCore(module);
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

	function isCore(module){
		var contains = moduleList.contains(module); //check if is core
		if (contains){
			return contains; //return true
		}
	}

	function inCore(module){
		var notAdded = inMapper(module);
		var inCore = isCore(module);
		var added = false;
		if (notAdded && inCore){
			added = false;
		}
	}
	return !added;
  }
  
  Mapper.remove = (index) => {
    mods.splice(index,1);
  }

return Mapper;
}]);

