var mainApp = angular.module('myApp.CourseReq', []);

mainApp.factory('CourseReq', ['$http', '$q', function($http,$q) {
  var CourseReq = {};
  var selectedCourse = "";

  CourseReq.init = (course) => {
    selectedCourse = course;
    //switch case shit;
    if (angular.equals(selectedCourse, "Business Analytics")) {
      course = 1;
    } else if (angular.equals(selectedCourse, "Computer Science")) {
      course = 2;
    }

    switch(course) {
      case 1:
      $http.get("nusmods/bamods.json")
      .then((res) =>{
        CourseReq.data = res.data;
        console.log(CourseReq.data);
      })
      .catch((err) =>{
        alert(err);
      });
      break;
      case 2:
      $http.get("nusmods/csmodsnew.json")
      .then((res) =>{
        CourseReq.data = res.data;
      })
      .catch((err) =>{
        alert(err);
      });
      break;
    }
  }

    
return CourseReq;
}]);