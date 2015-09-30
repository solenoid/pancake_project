var $ref = require('falcor').Model.ref;
var Router = require('falcor-router');
var _ = require('lodash');
var PouchDB = require('pouchdb');
var db = new PouchDB('data/user');

var inRange = function (ranges) {
  return function (i) {
    return _.some(ranges, function (range) {
      return i >= range.from && i <= range.to;
    });
  };
};

var UsersRouter = Router.createClass([
  {
    route: 'users[{ranges:indexRanges}]',
    get: function (pathSet) {
      var rangeChecker = function (user, i) {
        return inRange(pathSet.indexRanges)(i);
      };
      return db.allDocs({ include_docs: true })
        .then(function (res) {
          return _(res.rows)
            .map(function (user, i) {
              console.log(user, i);
              return {
                path: ['users', i],
                value: $ref(['usersById', user.doc.uid])
              };
            })
            .filter(rangeChecker)
            .value();
        }, function (err) {
          // TODO figure out sane error handling
          console.log(err);
        });
    }
  },
  {
    route: 'usersById[{keys:ids}]["uid","is_enabled","name","company","email","phone","office"]',
    get: function (pathSet) {
      var fields = pathSet[2];
      return db.allDocs({ include_docs: true })
        .then(function (res) {
          return _(pathSet.ids)
            .map(function (id) {
              var user = _.find(res.rows, { doc: { uid: id } });
              // TODO null the record if the id can't be found
              return _.map(fields, function (field) {
                // TODO consider missing field support more closely
                return { path: ['usersById', id, field], value: user.doc[field] };
              });
            })
            .flatten()
            .value();
        }, function (err) {
          // TODO figure out sane error handling
          console.log(err);
        });
    }
  }
]);

module.exports = UsersRouter;
