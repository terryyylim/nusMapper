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
return Prerequisite;
}]);