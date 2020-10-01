const { Given, When, Then, After } = require('cucumber');
const assert = require('assert');
const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))

Given('the auth server is up and running', async function () {
  await this.http.get('ping');
  this.users = {}
});

When('the user with email {string} and password {string} is created', async function (email, password) {
  this.users[email] = { signUp: {}}
  const res = await this.http.post('signUp', { json: { email: email, password: password }, responseType: 'json'});
  this.users[email]['signUp']['status_code'] = res.statusCode;
  this.users[email]['signUp']['accessToken'] = res.body.accessToken;
  this.users[email]['signUp']['refreshToken'] = res.body.refreshToken;
  this.users[email]['signUp']['userId'] = res.body.userId;
});

When('we sign in with with email {string} and password {string} is created', async function (email, password) {
  this.users[email]['signIn'] = {}
  const res = await this.http.post('signIn', { json: { email: email, password: password }, responseType: 'json'});
  this.users[email]['signIn']['status_code'] = res.statusCode;
  this.users[email]['signIn']['accessToken'] = res.body.accessToken;
  this.users[email]['signIn']['refreshToken'] = res.body.refreshToken;
  this.users[email]['signIn']['userId'] = res.body.userId;
});

Then('the user with email {string} is created', function (email) {
  assert.equal(this.users[email]['signUp']['status_code'], 201);
});

Then('the user with email {string} is logged in', function (email) {
  assert.equal(this.users[email]['signIn']['status_code'], 200);
  assert.equal(this.users[email]['signIn']['userId'], this.users[email]['signUp']['userId']);
});

After({tags: "@cleanUsers"}, async function () {
  for (var email in this.users){
    const userId = this.users[email]['signUp']['userId'];
    await this.http.post('deleteUser', { json: { userId: userId }, responseType: 'json'});
  }
  this.users = {}
});
