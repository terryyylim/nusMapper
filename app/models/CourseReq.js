var mainApp = angular.module('myApp');

mainApp.factory('CourseReq', ['$http', '$q', function($http,$q) {
  var CourseReq = {};
  CourseReq.init = (course) => {
    //switch case shit;
    $http.get("nusmods/bamods.json")
    .then((res) =>{
      CourseReq.data = res.data;
    })
    .catch((err) =>{
      alert(err);
    })
  }

    
return CourseReq;
}]);