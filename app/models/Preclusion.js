var mainApp = angular.module('myApp');

mainApp.factory('Preclusion', ['$http', function($http) {
  var Preclusion = {};
  Preclusion.init = () => {
  	$http.get("nusmods/prereq.json")
	    .then((res) => {
	    	Preclusion.preclus = res.data;
	    	console.log(Preclusion.preclus);
	    })
	    .catch((err) => {
	    	alert("error");
	    });
    console.log("Preclusion initted");
  }

  Preclusion.eval_hasPreclu = (list, index, contain) => { 
  	let mPreclu = Preclusion.preclus[index];
  	return eval_h(mPreclu.preclusion);

  	// this is a little hacky, but because eval_h is defined within eval_hasPrereq, it is within
  	// the scope of the latter's function and will be able to access list & contain (parent scope)

  	function eval_h(preclu){  // v2
		console.log(preclu);
		//let prereq = Mapper.prereq[index].prerequisite === "undefined" ? 
		//				Mapper.Mapper.prereq[index].prerequisite : undefined;
		if(preclu === undefined){ //Base Case 1: No Prerequisites
			return false; //if true, means can take this module 
		} else if(typeof preclu === 'string' || preclu instanceof String){ //Base Case 2: Only 1 Prereq to begin with
			return contain(list, preclu);
		} else if(preclu.or) {
			if(preclu.or.length > 1){
				return eval_h(preclu.or[0]) || 
					eval_h({"or" : preclu.or.slice(1)});
			} else {
				return eval_h(preclu.or[0]);
			}
		} else if(preclu.and) {
			if(preclu.and.length > 1){
				return eval_h(preclu.and[0]) && 
					eval_h({"and" : preclu.and.slice(1)});
			} else {
				return eval_h(preclu.and[0]);
			}
		} else{
			alert("input error");
		}
	}

  }

  
return Preclusion;
}]);