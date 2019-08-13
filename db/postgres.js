const pg = exports; 
const pgLib = require('pg');

pg.initialize = (cb) => {
  const client = new pgLib.Client('postgres://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+'/'+process.env.DB_NAME);
  client.connect((err) => {
    if (err) {
      return cb(err);
    }

    pg.client = client;
    cb();
  });
};