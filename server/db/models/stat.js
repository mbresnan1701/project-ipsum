var db = require('../config.js');
var clientApps = require('./client-app');
var clientServers = require('./client-server');

var Stat = db.Model.extend({
  tableName: 'stats',
  hasTimestamps: true,

  clientApps: function() {
    return this.belongsTo(clientApps);
  },

  clientServers: function () {
    return this.belongsTo(clientServers);
  }
});

module.exports = Stat;
