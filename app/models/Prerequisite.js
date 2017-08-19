var mainApp = angular.module('myApp');

mainApp.factory('Prerequisite', ['$http', function($http) {
  var Prerequisite = {};
  Prerequisite.init = () => {
  	$http.get("nusmods/prereq.json")
        .then((res) => {
        	Prerequisite.prereqs = res.data;
        	console.log(Prerequisite.prereqs);
        })
        .catch((err) => {
        	alert("error");
        });
  	console.log("Prerequisite initted");
  }

  // list is list of all modules in mapper
  // index is index of module in prereq list
  // contain is mapper function to check if module is in modules
  // contain(list, module) ret true if inside, false otherwise.
  Prerequisite.eval_hasPrereq = (list, index, contain) => { 
  	let mPrereq = Prerequisite.prereqs[index];
  	console.log(mPrereq);
  	return eval_h(mPrereq.prerequisite);

  	// this is a little hacky, but because eval_h is defined within eval_hasPrereq, it is within
  	// the scope of the latter's function and will be able to access list & contain (parent scope)

  	//overwriting contain
  	function contain(list, moduleCode){
  		var myArray = Array.prototype.slice.call(list);
		console.log(list);
		//console.log("x " + list);
		if(list === undefined || (Array.isArray(list) && !list.length)){   // end of list
			return false;
			//console.log(typeof list[0]);
		} else if(Array.isArray(list)){ // if branch
			return contain(list[0], moduleCode) || contain(myArray.slice(1), moduleCode);
		} else{ // leaf
			if(list ===  undefined){ // empty array
				return false;
			} else{
				return(angular.equals(list.moduleCode, moduleCode) || 
					contain(myArray.slice(1),moduleCode));
			}
		}
  	}

  	function eval_h(prereq){  // v2
		console.log(prereq);
		//let prereq = Mapper.prereq[index].prerequisite === "undefined" ? 
		//				Mapper.Mapper.prereq[index].prerequisite : undefined;
		if(prereq === undefined){ //Base Case 1: No Prerequisites
			return true; //if true, means can take this module 
		} else if(typeof prereq === 'string' || prereq instanceof String){ //Base Case 2: Only 1 Prereq to begin with
			console.log(contain(list, prereq));
			console.log(list);
			return contain(list, prereq);
		} else if(prereq.or) {
			if(prereq.or.length > 1){
				return eval_h(prereq.or[0]) || 
					eval_h({"or" : prereq.or.slice(1)});
			} else {
				return eval_h(prereq.or[0]);
			}
		} else if(prereq.and) {
			if(prereq.and.length > 1){
				return eval_h(prereq.and[0]) && 
					eval_h({"and" : prereq.and.slice(1)});
			} else {
				return eval_h(prereq.and[0]);
			}
		} else{
			alert("input error");
		}
	}

  }

  
return Prerequisite;
}]);