var app = angular.module("mainApp",["ngRoute"]);
console.log("Print");
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
    	template: 'Welcome user!',
        templateUrl : "index.html",
        controller : "mainApp"
    })
    .when("/searchbar", {
    	templateUrl : "searchbar.html",
    	controller : "searchCtrl"
    })
    .when("/core", {
        templateUrl : "core.html",
        controller : "coreCtrl"
    })
    .when("/unrestrictedE", {
        templateUrl : "unrestrictedE.html",
        controller : "unrestrictedECtrl"
    })
    .when("/gem", {
    	templateUrl : "gem.html",
    	controller : "gemCtrl"
    })
});