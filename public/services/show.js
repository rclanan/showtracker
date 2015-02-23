angular.module('ShowTracker')
  .factory('Show', ['$resource', function($resource) {
    return $resource('/api/shows/:_id');
  }]);
