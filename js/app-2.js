angular.module('MyApp', ['ngMaterial'])

.controller('AppCtrl', function($scope) {
  var USER_ID = 'U-123';
  var self = this;
  neo4j = neo4j.v1;
  var driver = neo4j.driver('bolt://127.0.0.1:7687', neo4j.auth.basic('neo4j', '123456'));
  var session = driver.session();

  self.test = function(type) {
    run(type);
  };

  function run(type) {
    var query = `CREATE (n:action {userId: '${USER_ID}', type: '${type}'})`;
    var result = session.run(query);
    result.then(function(data) {
        console.log(data);
    }, function(e) {
        console.log(e)
    });
  }

});
