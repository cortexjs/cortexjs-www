var couchdb = require('couch-db');
var config = require('config').Couch;


var createDB = module.exports = function(options) {
  var couch = couchdb(config.address, options);

  couch.users = couch.database('_users');

  couch.users.extend({
    existsUser: function(username, callback) {
      var id = 'org.couchdb.user:' + username;
      this.doc(id).exists(callback);
    },
    createUser: function(profile, callback) {

    }
  });

  couch.bind('registry');

  couch.registry.extend({

  });
};

module.exports.couchdbAttach = function() {
  return function(req, res, next) {
    req.couchdb = createDB();
    next();
  };
};