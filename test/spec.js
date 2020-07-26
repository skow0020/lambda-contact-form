var request = require('supertest');

describe('Serves correctly', function () {
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

  it('Renders Contact pg html', function testPath(done) {
    request(server)
      .get('/')
      .expect(function (res) {
        expect(res.text).toContain('<div class="container-contact3">')
      })
      .expect(200, done);
  });
});

describe('Contact Page UI', () => {
  beforeAll(async () => {
    await page.goto('https://skow-contact-form-dev.herokuapp.com/');
  });

  it('should be able to contact via UI', async () => {
    await expect(page.title()).resolves.toMatch('Contact');
    
    await page.$eval('#name', el => el.value = 'JOHN SILYRI');
    await page.$eval('#email', el => el.value = 'test@example.com');
    await page.$eval('#message', el => el.value = 'Example message');

    await page.click(".contact3-form-btn");

    await page.waitForFunction(
      'document.querySelector("#alert").innerText.includes("Thanks for contacting us.")'
    );
  });
});