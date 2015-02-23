angular.module('ShowTracker')
  .controller('NavbarCtrl', function($scope, Auth) {
    $scope.logout = function() {
      Auth.logout();
    };
  });
