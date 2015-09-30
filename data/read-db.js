var PouchDB = require('pouchdb');
var db = new PouchDB('data/company');
// var _ = require('lodash');

db.allDocs({ include_docs: true, limit: 20 })
  .then(function (res) {
    console.log(res.rows);
  }, function (err) {
    console.log(err);
  });
