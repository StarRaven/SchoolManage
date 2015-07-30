angular.module('sbAdminApp')
.controller('studentListCtrl',
function ($scope, $http, $state, $modal, $timeout, Restangular) {
  $scope.login().then(function (){
    $scope.school = $scope.currentUser.$related.school;
    $scope.students=Restangular.all('schools/'+$scope.school.$id.toString()+'/students').getList().$object;
    
    console.log($scope.students);

    $scope.update = function() {
      $scope.user = $scope.selected.value[0];
      if($scope.user.gender == 1)
        $scope.user.gendername = '男';
      else
        $scope.user.gendername = '女';
      console.log($scope.user);
    };

    $scope.submitForm = function (student) {
      if(student.gendername == '男')
        student.gender = 1;
      else
        student.gender = 2;
      Restangular.one('students', student.$id).patch(student).then(function() {
        alert("修改成功");
      });
    };
    $scope.assign = function() {
      $modal.open({
          templateUrl : 'views/student/student_major_course.html',
          controller: 'studentAssignCtrl',
          backdrop : 'static',
          keyboard : false,
          resolve: {
                    school: function () {
                        return $scope.school;
                    },
                    student: function () {
                      return $scope.user;
                    }
                }
        })
      };
  })
});
