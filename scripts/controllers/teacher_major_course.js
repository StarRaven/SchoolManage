angular.module('sbAdminApp')
.controller('teacherAssignCtrl',
function ($scope, $http, $state, $timeout, $modalInstance, Restangular, school, teacher) {

    $scope.closeModal = function(){
      $modalInstance.close();
    };
    $scope.school = school;
    $scope.teacher = teacher;
    //console.log($scope.teacher);
    $scope.majors = Restangular.all('schools/'+$scope.school.$id.toString()+'/majors').getList().$object;
    $scope.list = 
    $scope.selected = {};
    $scope.selected.value = [1];
    $scope.major = Restangular.one('teachers', $scope.teacher.$id, 'major');
    //console.log($scope.majors);
    //console.log($scope.major);

    $scope.update = function() {
      $scope.major = $scope.selected.value[0];
      console.log($scope.major);
    };

    $scope.submitForm = function (major) {
      console.log(teacher);
    };

});
