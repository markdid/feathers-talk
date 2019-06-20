const app = require('../../src/app');

describe('\'sockets\' service', () => {
  it('registered the service', () => {
    const service = app.service('sockets');
    expect(service).toBeTruthy();
  });
});
