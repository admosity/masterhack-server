var module = require('./module.js');

module.service('Issue', function ($http) {
  var api = {
    getIssuesNear: function (location) {
      return $http.get('/api/issue', {
        params: {
          location: location
        }
      });
    },
    getIssueById: function (id) {
      return $http.get('/api/issue/' + id);
    }
  };

  return api;
});
