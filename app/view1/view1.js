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

function myFunction() {
  // Declare variables 
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}