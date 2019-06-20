const app = require('../../src/app');

describe('\'live\' service', () => {
  it('registered the service', () => {
    const service = app.service('live');
    expect(service).toBeTruthy();
  });
});
