angular.module('sbAdminApp')
.controller('courseBuyCtrl',
function($scope, $http, $state, $timeout, Restangular) {
  $scope.login().then(function() {
    $scope.school = $scope.currentUser.$related.school;
    $scope.coursesAll = Restangular.all('courses?size=100000').getList().$object;
    $scope.coursesExisted = Restangular.all('schools/' + $scope.school.$id.toString() + '/courses').getList().$object;
    $scope.courseEnum = {
      1: '公共基础课',
      2: '专业核心课',
      3: '实训课',
      8: '模板课',
    }

    $scope.updateExisted = function() {
      $scope.courseExisted = $scope.selectedcourseExisted.value[0];
    };

    $scope.updateAll = function() {
      $scope.courseAll = $scope.selectedcourseAll.value[0];
    };

    $scope.buyCourse = function() {
      if($scope.courseAll){
        var reqAdd = {
          method: 'POST',
          url: '/api/schools/' + $scope.school.$id.toString() + '/links/courses',
          headers: {
            'Access-Token': $scope.currentUser.$token,
          },
          data: {
            "data": [{
              type: "course",
              id: $scope.courseAll.$id
            }]
          }
        };
        console.log(reqAdd);
        $http(reqAdd)
          .then(function() {
            alert("添加指定课程成功");
            $scope.coursesExisted = Restangular.all('schools/' + $scope.school.$id.toString() + '/courses').getList().$object;
          });
        }
    };
  });
});
