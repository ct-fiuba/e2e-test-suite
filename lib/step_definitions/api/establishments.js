const { Given, When, Then } = require('cucumber');
const assert = require('assert');

Given('the system is up and running', async function () {
  await this.http.get('ping');
});

Given('the establishment called {string} characteristics:', function (establishment_name, characteristics) {
  this.establishment_name = characteristics.rowsHash();
  this.establishment_name['spaces'] = [];
});

Given('{string} has a space with characteristics:', function (establishment_name, characteristics) {
  this.establishment_name['spaces'].push(characteristics.rowsHash());
});

When('the establishment {string} is created', async function (establishment_name) {
  const res = await this.http.post('establishments', { json: this.establishment_name, responseType: 'json' });
  this.establishment_name['_id'] = res.body._id;
});

Then('the system has the establishment {string}', async function (establishment_name) {
  const res = await this.http.get(`establishments/${this.establishment_name['_id']}`, {responseType: 'json'});
  assert.equal(res.body['_id'], this.establishment_name['_id']);
  assert.equal(res.body['type'], this.establishment_name['type']);
  assert.equal(res.body['name'], this.establishment_name['name']);
  assert.equal(res.body['email'], this.establishment_name['email']);
  assert.equal(res.body['address'], this.establishment_name['address']);
  assert.equal(res.body['city'], this.establishment_name['city']);
  assert.equal(res.body['state'], this.establishment_name['state']);
  assert.equal(res.body['zip'], this.establishment_name['zip']);
});

Then('the system has {int} spaces for the establishment {string}', async function (num_spaces, establishment_name) {
  const res = await this.http.get(`establishments/${this.establishment_name['_id']}`, {responseType: 'json'});
  assert.equal(res.body['spaces'].length, num_spaces);
});
