var PouchDB = require('pouchdb');
var user_db = new PouchDB('data/user');
var company_db = new PouchDB('data/company');
var USER_DATA = require('./initial-users.json');
var COMPANY_DATA = require('./initial-companies.json');

// Apparently bulkDocs doesn't fail the promise even if all docs are conflicts
// user_db.bulkDocs(USER_DATA)
//   .then(function (res) {
//     console.log(res);
//     console.log('Successfully populated Pouch DB');
//   }, function (err) {
//     console.log(err);
//     console.log('Error populating Pouch DB');
//   });

// So just loop through users and add them one at a time for slightly better error clarity
USER_DATA.forEach(function (user) {
  user_db.put(user)
    .then(function (res) {
      console.log(res);
    }, function (err) {
      console.log(err);
    });
});

COMPANY_DATA.forEach(function (user) {
  company_db.put(user)
    .then(function (res) {
      console.log(res);
    }, function (err) {
      console.log(err);
    });
});
