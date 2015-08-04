angular.module('sbAdminApp')
.controller('studentManageCtrl',
function ($scope, $http, $state, $modal, $timeout, Restangular) {
  $scope.login().then(function (){
    $scope.user = {};
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
      if(student.$id != null){
        if(student.gendername == '男')
          student.gender = 1;
        else
          student.gender = 2;
        Restangular.one('students', student.$id).patch(student).then(function() {
          alert("修改成功");
        });
      }
    };
    $scope.assign = function() {
      if($scope.user.$id != null){
        $modal.open({
            templateUrl : 'views/student/student_course.html',
            controller: 'studentCourseCtrl',
            backdrop : 'static',
            keyboard : false,
            resolve: {
                      school: function () {
                          return $scope.school;
                      },
                      student: function () {
                        return $scope.user;
                      },
                      currentUser: function () {
                        return $scope.currentUser;
                      }
                  }
          })
      }
    };
    $scope.studentremove = function() {
      if($scope.user.$id != null){
        var id = $scope.user.$id;
        var path = 'students/'+id;
        Restangular.one(path).remove().then(function(){
          alert("删除成功");
          $state.reload();
        });
      }
    };
  })
});
