angular.module('sbAdminApp')
.controller('studentCourseCtrl',
function ($scope, $http, $state, $timeout, $modalInstance, Restangular, school, student, currentUser) {
    $scope.closeModal = function(){
      $modalInstance.close();
    };

    $scope.school = school;
    $scope.student = student;
    //console.log($scope.student);
    Restangular.all('students/'+$scope.student.$id.toString()+'/courses').getList().then(function(existcourses){
      $scope.coursesExisted = existcourses;
      console.log($scope.coursesExisted);
      Restangular.all('schools/'+$scope.school.$id+'/courses').getList().then(function(courses){
        $scope.allcourses = courses;
        $scope.coursesAll = [];
        $scope.coursesidAll = [];
        $scope.existidAll = [];
        $scope.coursesExisted.forEach(function(course) {
          $scope.existidAll.push(course.$id);
        });
        $scope.allcourses.forEach(function(course) {
          var flag = false;
          $scope.existidAll.forEach(function(courseid) {
            if(course.$id == courseid){
              flag = true;
            }
          });
          if(flag == false){
            $scope.coursesAll.push(course);
          }
        });
      });
    });
    //console.log($scope.majors);
    //console.log($scope.major);
    $scope.clazz = {};
    $scope.updateExisted = function() {
      $scope.courseExisted = $scope.selectedcourseExisted.value[0];
    };

    $scope.delCourse = function () {
      console.log($scope.courseExisted);
      var reqDEL = {
      method: 'DELETE',
      url: '/api/students/'+$scope.student.$id.toString()+'/links/courses',
      headers: {
       'Access-Token': currentUser.$token,
      },
      data: {
          "data":[
            {
              type:"course",
              id: $scope.courseExisted.$id
            }
          ]
        }
      };
      console.log(reqDEL);
      $http(reqDEL)
        .then(function () {
            alert("删除指定课程成功");
            $scope.coursesExisted = Restangular.all('students/'+$scope.student.$id.toString()+'/courses').getList().$object;
          });
    };

    $scope.updateAll = function() {
      $scope.courseAll = $scope.selectedcourseAll.value[0];
      $scope.clazzs  = $scope.courseAll.$related.clazzs;
    };

    $scope.updateClazz = function() {
      $scope.clazzAll = $scope.selectedclazzAll.value[0];
    };

    $scope.addCourse = function () {
      var reqAdd = {
      method: 'POST',
      url: '/api/students/'+$scope.student.$id.toString()+'/links/clazz',
      headers: {
       'Access-Token': currentUser.$token,
      },
      data: {
          "data":
            {
              type:"clazz",
              id: $scope.clazzAll.$id,
              meta:{password:$scope.clazzAll.enrollPwd}
            }
        }
      };
      console.log(reqAdd);
      $http(reqAdd)
        .then(function () {
            alert("添加指定课程成功");
            $scope.coursesExisted = Restangular.all('students/'+$scope.student.$id.toString()+'/courses').getList().$object;
          });
    };


});
