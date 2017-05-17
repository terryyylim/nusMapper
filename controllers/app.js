var mainApp = angular.module("mainApp",["ui.router"]);
//console.log("Print");

mainApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state("home", {
            url : "/home",
            templateUrl : "searchbar.html"
        })
        .state("core", {
            url : "/core",
            templateUrl : "core.html"
        })
        .state("unrestrictedE", {
            url : "/unrestrictedElectives",
            templateUrl : "unrestrictedE.html"
        })
        .state("gem", {
            url : "/gem",
            templateUrl : "gem.html"
        });
        .state("about", {
            url: "/gem",
            views {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'gem.html' },

                // the child views will be defined here (absolutely named)
                'columnOne@about': { template: 'Look I am a column!' },

                // for column two, we'll define a separate controller 
                'columnTwo@about': { 
                    templateUrl: 'modules.html',
                    controller: 'searchController'
                }
            }
        })
    });

mainApp.controller('searchController', function($scope) {

    $scope.message = 'test';

    $scope.searches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];

});