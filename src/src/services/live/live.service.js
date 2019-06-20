// Initializes the `live` service on path `/live`
const createService = require('feathers-nedb');
const createModel = require('../../models/live.model');
const hooks = require('./live.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/live', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('live');

  service.hooks(hooks);
};
