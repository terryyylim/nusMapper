'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
    controllerAs: "vm"
  });
}])

//Why does this function not work at all when I place it here
//function populate(sourceString) {
//	var availableTags = document.getElementById(sourceString);
//	var sourceObject = eval(sourceString);
//	var obj = new sourceObject();
//	var options = '';
//
//	for(var i = 0; i < obj.list.length; i++) {
//		options += '<option value = "'+obj.list[i] + '" />'; 
//	}
//	availableTags.innerHTML = options;
//}

.controller('View1Ctrl', ["$http", "$q", "$scope", "Module", "Mapper", function($http,$q, $scope, Module, Mapper) {
	this.Mapper = Mapper;


	Module.getMods().then((data) => {
		console.log(data);
		//lexical this (comes with the arrow, ES6 function)
		this.modules = data;
	});


	this.addModule = (module) => {
		Mapper.add(module);
	}

	this.removeModule = (index) => {
		Mapper.remove(index);
	}

}]);

