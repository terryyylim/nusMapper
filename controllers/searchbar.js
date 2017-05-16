app.controller('searchbar', function($scope, $http) {
	$http.get("orbital.json")
	.then(function(response) {
		$scope.moduleData = response.data;
	});
});

/*app.controller('searchCtrl', function($scope) {
	$scope.searches = [
		{'moduleCode': ??, 'moduleTitle' : ?? }
	];

	$scope.search = function() {
		d = {}
		d['moduleCode'] = $scope.moduleCode;
		$scope.message = $scope.moduleCode + "has been added";
		$scope.mainApp.push(d);
		$scope.moduleCode = "";
		$scope.message = $scope.mainApp;
	};
});*/