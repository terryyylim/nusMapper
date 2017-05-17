$scope.callRestService= function() {
  $http({method: 'GET', url: '/search'}).
    success(function(data, status, headers, config) {
         $scope.results.push(data);  //retrieve results and add to existing results
    })
}

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