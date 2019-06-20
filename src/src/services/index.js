const messages = require('./messages/messages.service.js');
const users = require('./users/users.service.js');
const live = require('./live/live.service.js');
const sockets = require('./sockets/sockets.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(messages);
  app.configure(users);
  app.configure(live);
  app.configure(sockets);
};
