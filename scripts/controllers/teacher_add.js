angular.module('sbAdminApp')
.controller('teacherAddCtrl',
function ($scope, $http, $state, $timeout, Restangular) {
  console.log($scope.currentUser);
  var original;
  return $scope.user = {
      $type: "teacher",
      username: "",
      password: "",
      email: "",
      trueusername: "",
      department: "",
      title: "",
      phone: "",
      credit: "",
      level: ""
  },
  $scope.showInfoOnSubmit = !1,
  original = angular.copy($scope.user),
  $scope.revert = function() {
      return $scope.user = angular.copy(original),
      $scope.form_signin.$setPristine()
  },
  $scope.canRevert = function() {
      return ! angular.equals($scope.user, original) || !$scope.form_signin.$pristine
  },
  $scope.canSubmit = function() {
      return $scope.form_signin.$valid && !angular.equals($scope.user, original)
  },
  $scope.submitForm = function() {
      console.log($scope.user);
      Restangular.all('teachers').post($scope.user).then(function (question) {
          //$state.go('courseManage.questions', {course: $scope.question.$relationships.course.data.id}, {reload: true});
        });
      return $scope.showInfoOnSubmit = !0,
      $scope.revert()
  };

});
