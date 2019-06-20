// Initializes the `sockets` service on path `/sockets`
const createService = require('./sockets.class.js');
const hooks = require('./sockets.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // app.get('/sockets', function(req,res) {
  //   let liveUsers = (app.channel('authenticated').length);
  //   let json = {
  //     'live': liveUsers
  //   };
  //   res.json(json);
  // });

  // Initialize our service with any options it requires
  app.use('/sockets', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('sockets');

  service.hooks(hooks);
};
