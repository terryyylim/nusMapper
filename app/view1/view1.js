'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
    controllerAs: "vm"
  });
}])

.controller('View1Ctrl', ["$http", "$q", "$scope", function($http,$q, $scope) {
	getModules().then((data) => {
		console.log(data);
		//lexical this (comes with the arrow, ES6 function)
		this.modules = data;
	});

	function getModules(){
		return $q(function(resolve,reject){
			$http.get("orbital.json")
			.then(function(response){
				resolve(response.data);
			}).catch(function(error){
				reject(error);
			});
		});
	}
	
}]);

