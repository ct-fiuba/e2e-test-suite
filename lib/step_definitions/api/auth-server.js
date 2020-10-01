const { Given, When, Then } = require('cucumber');
const assert = require('assert');
const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))

Given('the auth server is up and running', async function () {
  await this.http.get('ping');
  this.users = {}
});

When('the user with email {string} and password {string} is created', async function (email, password) {
  this.users[email] = {}
  const res = await this.http.post('signUp', { json: { email: email, password: password }, responseType: 'json'});
  this.users[email]['status_code'] = res.statusCode;
  this.users[email]['refreshToken'] = res.body.refreshToken;
  this.users[email]['userId'] = res.body.userId;
});

Then('the user with email {string} is created', async function (email) {
  assert.equal(this.users[email]['status_code'], 201);
});
