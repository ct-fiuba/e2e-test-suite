const got = require('got');

const { Before, After } = require('cucumber');

Before('@ct-api', async function() {
  const client = got.extend({
    prefixUrl: 'http://localhost:5000'
  });
  this.http = client;
  await this.http.get('ping');
  this.establishments = this.establishments || {};
});

After({tags: "@cleanEstablishments"}, async function () {
  this.establishments = {};
});
