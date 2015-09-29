var $ref = require('falcor').Model.ref;
var Router = require('falcor-router');
var USER_DATA = require('./users').USER_DATA;
var _ = require('lodash');

var inRange = function (ranges) {
  return function (i) {
    return _.some(ranges, function (range) {
      return i >= range.from && i <= range.to;
    });
  };
};
// deserves some partial application love but also likely mixed w/ lodash-fp
// var unreadableOneLineinRange = (ranges) => (i) => _.some(ranges, (range) => (i >= range.from && i <= range.to));

var UsersRouter = Router.createClass([
  {
    route: 'users[{ranges:indexRanges}]',
    get: function (pathSet) {
      var rangeChecker = function (user, i) {
        return inRange(pathSet.indexRanges)(i);
      };
      var rr = _(USER_DATA)
        .map(function (user, i) {
          return {
            path: ['users', i],
            value: $ref(['usersById', user.uid])
          };
        })
        .filter(rangeChecker)
        .value();
      return rr;
    }
  },
  {
    route: 'usersById[{keys:ids}]["uid","is_enabled","name","company","email","phone","office"]',
    get: function (pathSet) {
      var fields = pathSet[2];
      return _(pathSet.ids)
        .map(function (id) {
          var user = _.find(USER_DATA, { uid: id });
          // TODO null the record if the id can't be found
          return _.map(fields, function (field) {
            // TODO consider missing field support more closely
            return { path: ['usersById', id, field], value: user[field] };
          });
        })
        .flatten()
        .value();
    }
  }
]);

module.exports = UsersRouter;
