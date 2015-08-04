angular.module('sbAdminApp')
.controller('courseManageCtrl',
function ($scope, $http, $state, $modal, $timeout, Restangular, dateFilter) {
  $scope.login().then(function() {
    $scope.coursesAll = Restangular.all('courses?size=100000').getList().$object;
    $scope.updateAll = function() {
    //  $scope.course = $scope.selectedcourseAll.value[0];
    $scope.course = Restangular.one('courses', $scope.selectedcourseAll.value[0].$id).get().$object;
      console.log($scope.course);
    };
  //$scope.course=Restangular.one('courses', '1').get().$object;

  //form-group inputs begin
  $scope.isPosInt=function(num)
  {
     var re = /^[1-9]+[0-9]*]*$/;
     return re.test(num);
  };

  $scope.ratios={
    'assignmentRatio':{
      title:'作业比例',
      type:'success',
    },
    'testRatio':{
      title:'测验比例',
      type:'info'
    },
    'examRatio':{
      title:'考试比例',
      type:'danger'
    },
  };
  //$scope.$watchGroup(['course.assignmentRatio','course.examRatio'],function(ratios){
  //  $scope.course.testRatio=100-$scope.course.examRatio-$scope.course.assignmentRatio;
  //  $scope.ratiosValid = !isNaN($scope.course.testRatio);
  //})

  $scope.$watch('course.assignmentRatio' ,function(ratios){
    $scope.course.testRatio=100-$scope.course.examRatio-$scope.course.assignmentRatio;
    $scope.ratiosValid = !isNaN($scope.course.testRatio);
  })
  $scope.$watch('course.examRatio' ,function(ratios){
    $scope.course.testRatio=100-$scope.course.examRatio-$scope.course.assignmentRatio;
    $scope.ratiosValid = !isNaN($scope.course.testRatio);
  })
  //form-group inputs end

  //teaching matatiral begin
  $scope.chooseEnum={
    0:'未选择',
    1:'已选择'
  }


  //datepicker begin
  $scope.$watch('course.enrollStarttime', function (date)
  {
    $scope.course.enrollStarttime = dateFilter($scope.course.enrollStarttime, 'yyyy-MM-dd hh:mm:ss');
  });
  $scope.$watch('course.enrollEndtime', function (date)
  {
    $scope.course.enrollEndtime = dateFilter($scope.course.enrollEndtime, 'yyyy-MM-dd hh:mm:ss');
  });
  $scope.$watch('course.startTime', function (date)
  {
    $scope.course.startTime = dateFilter($scope.course.startTime, 'yyyy-MM-dd hh:mm:ss');
  });
  $scope.$watch('course.endTime', function (date)
  {
    $scope.course.endTime = dateFilter($scope.course.endTime, 'yyyy-MM-dd hh:mm:ss');
  });
  //datepicker end

  //className begin
  $scope.$watch('classNum',function(newClassNum,oldClassNum){
    $scope.course.classNames=$scope.course.classNames||['班级1'];
    if(newClassNum<oldClassNum){
      for(var i=oldClassNum;i>newClassNum;i--){
        $scope.course.classNames.pop();
      }
    }else{
      for(var i=oldClassNum;i<newClassNum;i++){
        $scope.course.classNames.push('班级'+(i+1));
      }
    }
  })
  //className end

  $scope.submit = function (course) {
    course.patch(course).then(function (c) {
      alert("修改成功");
      $scope.coursesAll = Restangular.all('courses?size=100000').getList().$object;
    });

  };
  $scope.courseremove = function() {
    $scope.course.remove().then(function (c) {
      alert("删除成功");
      $scope.coursesAll = Restangular.all('courses?size=100000').getList().$object;
    });
  };
});
});

function isEmpty(value) {
    return angular.isUndefined(value) || value === '' || value === null || value !== value;
};

angular.module('sbAdminApp')
.directive('ngMin', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMin, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var minValidator = function (value) {
                var min = scope.$eval(attr.ngMin) || 0;
                if (!isEmpty(value) && value < min) {
                    ctrl.$setValidity('ngMin', false);
                    return undefined;
                } else {
                    ctrl.$setValidity('ngMin', true);
                    return value;
                }
            };

            ctrl.$parsers.push(minValidator);
            ctrl.$formatters.push(minValidator);
        }
    };
});

angular.module('sbAdminApp')
.directive('ngMax', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMax, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var maxValidator = function (value) {
                var max = scope.$eval(attr.ngMax) || Infinity;
                if (!isEmpty(value) && value > max) {
                    ctrl.$setValidity('ngMax', false);
                    return undefined;
                } else {
                    ctrl.$setValidity('ngMax', true);
                    return value;
                }
            };

            ctrl.$parsers.push(maxValidator);
            ctrl.$formatters.push(maxValidator);
        }
    };
});
