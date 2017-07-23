'use strict';

angular.module('myApp.view1', ['ngRoute', 'myApp.CourseReq'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
    controllerAs: "vm"
  });
}])

.controller('View1Ctrl', ["$http", "$q", "$scope", "Module", "Mapper", "CourseReq", function($http,$q, $scope, Module, Mapper, CourseReq) {
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

	Module.getCourseMods().then((data) => {
		this.course = data;
	});
	
	$scope.faculty = [{
		'name': 'School of Computing',
		'color': 'Black',
		'suboptions': 
			{	name: ["Business Analytics","Computer Science","Information System", "Information Security"]
	}}, {
		'name': 'School of Engineering',
		'color': 'Black',
		'suboptions':
			{	name: ["Biomedical Engineering","Chemical Engineering","Civil Engineering","Electrical Engineering",
				"Mechanical Engineering"]
	}}, {
		'name': 'NUS Business School',
		'color': 'Black',
		'suboptions':
			{	name: ["Accountancy","Business Administration"]
	}}];

	$scope.cart = {
		'faculty': $scope.faculty[0]
	};

	//Store selected course so as to access correct conditions for user's course of study
	this.storeSelection = function() {
		var selected = $scope.selectedItem;
		console.log(selected);
		Mapper.setCourse(selected);
		CourseReq.init(selected);
	}

	this.getIndex = (module) => {
		console.log(module);
		var code = module.moduleCode;
		console.log(code);
		for(let i = 0; i < that.modules.length; i++){
			if(that.modules[i].moduleCode == code){
				return i;
			}
		}
		return -1;
	}

	this.parseSelected = () => {
		this.selected = JSON.parse(this.selected);
		//console.log(this.selected);
	}

	this.addModule = (module) => {
		//console.log(module);
		//module = JSON.parse(module);
		var index = that.getIndex(module);
		Mapper.add(module, index);
	}

	this.removeModule = (module) => {
		Mapper.remove(module);
	}

}]);
