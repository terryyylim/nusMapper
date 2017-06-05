'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
    controllerAs: "vm"
  });
}])

.controller('View1Ctrl', ["$http", "$q", "$scope", "Module", function($http,$q, $scope, Module) {
	Module.getMods().then((data) => {
		console.log(data);
		//lexical this (comes with the arrow, ES6 function)
		this.modules = data;
	});

}]);
