var request = require('supertest');

describe('loading express', function () {
  var server;

  beforeEach(function () {
    server = require('../index');
  });

  afterEach(function () {
    server.close();
  });

  it('responds to /', function testSlash(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });

  it('404 everything else', function testPath(done) {
    request(server)
      .get('/')
      .expect(function(res) {
        expect(res.text).toContain('<div class="container-contact3">')
      })
      .expect(200, done);
  });
});