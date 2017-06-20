'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
    controllerAs: "vm"
  });
}])

.controller('View1Ctrl', ["$http", "$q", "$scope", "Module", "Mapper", function($http,$q, $scope, Module, Mapper) {
	this.Mapper = Mapper;
	var that = this;

	Module.getMods().then((data) => {
		//console.log(data);
		//lexical this (comes with the arrow, ES6 function)
		this.modules = data;
	});
	
	Module.getPrereq().then((data) => {
		//console.log(data);
		//lexical this (comes with the arrow, ES6 function)
		this.prereq = data;
		//console.log(this.prereq);
	});
	
	this.getIndex = (module) => {
		var code = module.moduleCode;
		//console.log(code);
		for(let i = 0; i < that.modules.length; i++){
			if(that.modules[i].moduleCode == code){
				return i;
			}
		}
		return -1;
	}

	this.parseSelected = () => {
		this.selected = JSON.parse(this.selected);
	}

	this.addModule = (module) => {
		console.log(module);
		module = JSON.parse(module);
		var index = that.getIndex(module);
		Mapper.add(module, index);
	}

	this.removeModule = (index) => {
		Mapper.remove(index);
	}

}]);
