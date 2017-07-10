angular.module('myApp.coursereq', [])

.factory('Coursereq', ['Module', '$http', function(Module, $http) {
	var moduleList = {};
	var course = 0;

	var Coursereq = {

		selectedCourse: "",
		coreMC: 0,
    gemMC: 0,
		peMC: 0,
		internMC: 0
	}

	Coursereq.setCourse = (course) => {
  		Coursereq.selectedCourse = course;
  		console.log(Coursereq.selectedCourse);

  		if (angular.equals(Coursereq.selectedCourse, "Business Analytics")) {
  			course = 1;
  		} else if (angular.equals(Coursereq.selectedCourse, "Computer Science")) {
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

  	//Parse in JSON data according to which course was selected
	//Still need to add moduleList.getCourseMods method into view1.js controller

  //Business Analytics Graduation Check
  function canIgraduate(module) { //true means can graduate
    if (coreCleared(module) && gemCleared(module) && peCleared(module) && ueCleared(module) && internCleared(module)) {
      return true;
    }
    return false;
  }

  function coreCleared(module) {
    if (coreMC === 84) {
      return true;
    }
    return false;
  }
  function gemCleared(module) {
    if (gemMC === 20) {
      return true;
    }
    return false;
  }
  function peCleared(module) {
    if (peMC === 24) {
      return true;
    }
    return false;
  } 	
  function ueCleared(module) {
    if (ueMC === 20) {
      return true;
    }
    return false;
  }
  function internCleared(module) {
    if (internMC === 12) {
      return true;
    }
    return false;
  }

  function isCore(module) {
    for(i = 0; i < moduleList.compulsory.length; i++){ //check if it is a core
      if(angular.equals(moduleList.compulsory[i],module)){
        return true;
      }
    }
    return false;
  }

  function isPE(module) {
    var code = module.moduleCode;
    //Start from index 1 because want to skip 'compulsory' mods
    for (i = 1; i < moduleList.length; i++){
      if (code == "BT4104" || code == "BT4104" || code == "BT4104" || code == "BT4104" || code == "BT4104") {
        return true; //before adding to pe count, make sure that conditions are met
      }
      return false;
    }
  }

  return Coursereq;

}])