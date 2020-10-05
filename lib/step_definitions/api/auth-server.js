const { Given, When, Then, After } = require('cucumber');
const assert = require('assert');
const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))

When('the user with email {string} and password {string} is created', async function (email, password) {
  this.users[email] = { signUp: {} }
  const res = await this.http.post('signUp', { json: { email: email, password: password }, responseType: 'json'});
  this.users[email]['signUp']['res'] = res;
});

When('we sign in with email {string} and password {string} is created', async function (email, password) {
  this.users[email]['signIn'] = {}
  const res = await this.http.post('signIn', { json: { email: email, password: password }, responseType: 'json'});
  this.users[email]['signIn']['res'] = res;
});

Then('the user with email {string} exists', function (email) {
  assert.equal(this.users[email]['signUp']['res'].statusCode, 201);
});

Then('the user with email {string} is logged in', function (email) {
  assert.equal(this.users[email]['signIn']['res'].statusCode, 200);
  assert.equal(this.users[email]['signIn']['res'].body.userId, this.users[email]['signUp']['res'].body.userId);
});
