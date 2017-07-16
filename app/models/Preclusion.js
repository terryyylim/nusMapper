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
return Preclusion;
}]);