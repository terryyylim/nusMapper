'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl',
    controllerAs: 'vm2'
  });
}])

.controller('View2Ctrl', ["$http", "$scope", function($http, $scope) {
	var selected;

	var faculties = ["School of Computing", "School of Engineering", "NUS Business School"];
	var courses = [["Business Analytics","Computer Science", "Information System", "Information Security"],
				["Biomedical Engineering","Chemical Engineering","Civil Engineering","Electrical Engineering",
				"Mechanical Engineering"],
				["Accountancy","Business Administration"]];

	$scope.faculty = faculties;
	$scope.courseOptions = [];
	$scope.getCourseOptions = function(){
		var key = $scope.faculty.indexOf($scope.faculty);
		var myNewOptions = courses[key];

		$scope.courseOptions = myNewOptions;
	};
	
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
	$scope.storeSelection = function() {
		selected = $scope.selectedItem;
	}


}]);