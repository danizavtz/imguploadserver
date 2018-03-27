var pg = exports; 
var pgLib = require('pg');

pg.initialize = function(cb) {
  var client = new pgLib.Client('postgres://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+'/'+process.env.DB_NAME);
  client.connect(function(err) {
    if (err) {
      return cb(err);
    }

    pg.client = client;
    cb();
  });
};