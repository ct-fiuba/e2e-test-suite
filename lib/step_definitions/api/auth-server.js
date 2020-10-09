const { Given, When, Then, After } = require('cucumber');
const assert = require('assert');
const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))

Given('no user was created', function () { });

When('the user with email {string} and password {string} is created', async function (email, password) {
  this.users[email] = this.users[email] || { signUp: {}, signIn: {} };
  const res = await this.http.post('signUp', { json: { email: email, password: password }, responseType: 'json'});
  this.users[email]['signUp']['res'] = res;
});

When('we sign in with email {string} and password {string}', async function (email, password) {
  this.users[email] = this.users[email] || { signUp: {}, signIn: {} };
  try {
    const res = await this.http.post('signIn', { json: { email: email, password: password }, responseType: 'json'});
    this.users[email]['signIn']['res'] = res;
  } catch(err) {
    this.users[email]['signIn']['res'] = { statusCode: 400 }
  }
});

When('we validate the access token of {string}', async function (email) {
  this.users[email]['validateAccessToken'] = {}
  const res = await this.http.post('validateAccessToken', { json: { accessToken: this.users[email]['signIn']['res'].body.accessToken }, responseType: 'json'});
  this.users[email]['validateAccessToken']['res'] = res;
});

When('we refresh the access token of {string}', async function (email) {
  this.users[email]['refreshToken'] = {}
  const res = await this.http.post('refreshToken', { json: { refreshToken: this.users[email]['signIn']['res'].body.refreshToken }, responseType: 'json'});
  this.users[email]['refreshToken']['res'] = res;
});

Then('the user with email {string} exists', function (email) {
  assert.equal(this.users[email]['signUp']['res'].statusCode, 201);
});

Then('the user with email {string} is logged in', function (email) {
  assert.equal(this.users[email]['signIn']['res'].statusCode, 200);
  assert.equal(this.users[email]['signIn']['res'].body.userId, this.users[email]['signUp']['res'].body.userId);
});

Then('the user with email {string} does not exist', function (email) {
  assert.equal(this.users[email]['signIn']['res'].statusCode, 400);
});

Then('the access token of {string} is valid', function (email) {
  assert.equal(this.users[email]['validateAccessToken']['res'].statusCode, 200);
});

Then('the access token of {string} is different from the original one', function (email) {
  assert.notEqual(this.users[email]['refreshToken']['res'].accessToken, this.users[email]['signIn']['res'].body.accessToken);
});

Then('the access token of {string} is refreshed', function (email) {
  assert.equal(this.users[email]['refreshToken']['res'].statusCode, 200);
});
