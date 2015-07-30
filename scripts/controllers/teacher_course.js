angular.module('sbAdminApp')
.controller('teacherCourseCtrl',
function ($scope, $http, $state, $timeout, $modalInstance, Restangular, school, teacher, currentUser) {
    $scope.closeModal = function(){
      $modalInstance.close();
    };

    $scope.school = school;
    $scope.teacher = teacher;
    //console.log($scope.teacher);
    $scope.coursesExisted = Restangular.all('teachers/'+$scope.teacher.$id.toString()+'/courses').getList().$object;
    $scope.coursesAll = Restangular.all('majors/'+$scope.teacher.$relationships.major.data.id.toString()+'/courses').getList().$object;
    //console.log($scope.majors);
    //console.log($scope.major);

    $scope.updateExisted = function() {
      $scope.courseExisted = $scope.selectedcourseExisted.value[0];

    };

    $scope.delCourse = function () {
      console.log($scope.courseExisted);
      var reqDEL = {
      method: 'DELETE',
      url: '/api/teachers/'+$scope.teacher.$id.toString()+'/links/courses',
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
            $scope.coursesExisted = Restangular.all('teachers/'+$scope.teacher.$id.toString()+'/courses').getList().$object;
          });
    };

    $scope.updateAll = function() {
      $scope.courseAll = $scope.selectedcourseAll.value[0];
    };

    $scope.addCourse = function () {
      var reqAdd = {
      method: 'POST',
      url: '/api/teachers/'+$scope.teacher.$id.toString()+'/links/courses',
      headers: {
       'Access-Token': currentUser.$token,
      },
      data: {
          "data":[
            {
              type:"course",
              id: $scope.courseAll.$id
            }
          ]
        }
      };
      console.log(reqAdd);
      $http(reqAdd)
        .then(function () {
            alert("添加指定课程成功");
            $scope.coursesExisted = Restangular.all('teachers/'+$scope.teacher.$id.toString()+'/courses').getList().$object;
          });
    };


});
