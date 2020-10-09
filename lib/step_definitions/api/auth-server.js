const { Given, When, Then, After } = require('cucumber');
const assert = require('assert');
const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))

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

When('we generate a genux token for {string}', async function (email) {
  this.users[email]['generateGenuxToken'] = {}
  const res = await this.http.post('generateGenuxToken', { json: { accessToken: this.users[email]['signIn']['res'].body.accessToken }, responseType: 'json'});
  this.users[email]['generateGenuxToken']['res'] = res;
});

When('we use the genux token for {string}', async function (email) {
  this.users[email]['useGenuxToken'] = {}
  try {
    const res = await this.http.post('useGenuxToken', { json: { genuxToken: this.users[email]['generateGenuxToken']['res'].body.genuxToken }, responseType: 'json'});
    this.users[email]['useGenuxToken']['res'] = res;
  } catch {
    this.users[email]['useGenuxToken']['res'] = { statusCode: 400 };
  }
});

Then('the access token of {string} is different from the original one', function (email) {
  assert.notEqual(this.users[email]['refreshToken']['res'].accessToken, this.users[email]['signIn']['res'].body.accessToken);
});

Then('the {string} of {string} resulted in {int}', function(property, email, statusCode) {
  assert.equal(this.users[email][property]['res'].statusCode, statusCode);
});
