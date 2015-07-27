angular.module('sbAdminApp')
.controller('teacherListCtrl',
function ($scope, $http, $state, $timeout, Restangular) {

  $scope.school = $scope.currentUser;

  $scope.teachers=Restangular.all('schools/1/teachers').getList().$object;

  console.log($scope.teachers);

  $scope.haha = $scope.selectedTeacher;

  $scope.update = function() {
   $scope.user = $scope.selected.value[0];
   console.log($scope.user);
}


}
);
