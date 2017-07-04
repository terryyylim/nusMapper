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
		'color': 'Black'
	}, {
		'name': 'Faculty of Arts and Social Sciences',
		'color': 'Black'
	}, {
		'name': 'NUS Business School',
		'color': 'Black'
	}];

	$scope.cart = {
		'faculty': $scope.faculty[0]
	};


}]);