const got = require('got');
require('dotenv').config();

const { Before, After } = require('cucumber');

Before('@ct-api', async function() {
  const client = got.extend({
    prefixUrl: `${process.env.CT_API_URL}`
  });
  this.http = client;
  await this.http.get('ping');
  this.establishments = this.establishments || {};
  this.visits = this.visits || {};
});

After({tags: "@cleanEstablishments"}, async function () {
  this.establishments = {};
});

After({tags: "@cleanVisits"}, async function () {
  this.visits = {};
});
