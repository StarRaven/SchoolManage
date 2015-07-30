angular.module('sbAdminApp')
.controller('teacherListCtrl',
function ($scope, $http, $state, $modal, $timeout, Restangular) {
  $scope.login().then(function (){
    $scope.school = $scope.currentUser.$related.school;
    $scope.teachers=Restangular.all('schools/'+$scope.school.$id.toString()+'/teachers').getList().$object;

    console.log($scope.teachers);

    $scope.update = function() {
      $scope.user = $scope.selected.value[0];
      console.log($scope.user);
    };

    $scope.submitForm = function (teacher) {
      Restangular.one('teachers', teacher.$id).patch(teacher).then(function() {
        alert("修改成功");
      });
    };

    $scope.assign = function() {
      $modal.open({
          templateUrl : 'views/teacher/teacher_course.html',
          controller: 'teacherCourseCtrl',
          backdrop : 'static',
          keyboard : false,
          resolve: {
                    school: function () {
                        return $scope.school;
                    },
                    teacher: function () {
                      return $scope.user;
                    },
                    currentUser: function () {
                      return $scope.currentUser;
                    }
                }
        })
      };
  })
});
