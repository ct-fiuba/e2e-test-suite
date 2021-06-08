const { Given, When, Then, After } = require('cucumber');
const assert = require('assert');
const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))

When('the user with email {string}, DNI {string} and password {string} is created', async function (email, dni, password) {
  this.users[email] = this.users[email] || { signUp: {}, signIn: {} };
  const res = await this.httpAuthServer.post('users/signUp', { json: { email: email, DNI: dni, password: password }, responseType: 'json'});
  this.users[email]['signUp']['res'] = res;
});

When('the user sign in with email {string} and password {string}', async function (email, password) {
  this.users[email] = this.users[email] || { signUp: {}, signIn: {} };
  try {
    const res = await this.httpAuthServer.post('users/signIn', { json: { email: email, password: password }, responseType: 'json'});
    this.users[email]['signIn']['res'] = res;
  } catch(err) {
    this.users[email]['signIn']['res'] = { statusCode: 400 }
  }
});

When('we validate the user access token of {string}', async function (email) {
  this.users[email]['validateAccessToken'] = {}
  const res = await this.httpAuthServer.post('users/validateAccessToken', { json: { accessToken: this.users[email]['signIn']['res'].body.accessToken }, responseType: 'json'});
  this.users[email]['validateAccessToken']['res'] = res;
});

Given('the owner with email {string} and password {string} was created', async function (email, password) {
  this.owners[email] = this.owners[email] || { signUp: {}, signIn: {} };
  const res = await this.httpAuthServer.post('owners/signUp', { json: { email: email, password: password }, responseType: 'json'});
  this.owners[email]['signUp']['res'] = res;
});

When('the owner with email {string} and password {string} is created', async function (email, password) {
  this.owners[email] = this.owners[email] || { signUp: {}, signIn: {} };
  const res = await this.httpAuthServer.post('owners/signUp', { json: { email: email, password: password }, responseType: 'json'});
  this.owners[email]['signUp']['res'] = res;
});

When('the owner sign in with email {string} and password {string}', async function (email, password) {
  this.owners[email] = this.owners[email] || { signUp: {}, signIn: {} };
  try {
    const res = await this.httpAuthServer.post('owners/signIn', { json: { email: email, password: password }, responseType: 'json'});
    this.owners[email]['signIn']['res'] = res;
  } catch(err) {
    this.owners[email]['signIn']['res'] = { statusCode: 400 }
  }
});

When('we validate the owner access token of {string}', async function (email) {
  this.owners[email]['validateAccessToken'] = {}
  const res = await this.httpAuthServer.post('owners/validateAccessToken', { json: { accessToken: this.owners[email]['signIn']['res'].body.accessToken }, responseType: 'json'});
  this.owners[email]['validateAccessToken']['res'] = res;
});

When('we refresh the user access token of {string}', async function (email) {
  this.users[email]['refreshToken'] = {}
  const res = await this.httpAuthServer.post('refreshToken', { json: { refreshToken: this.users[email]['signIn']['res'].body.refreshToken }, responseType: 'json'});
  this.users[email]['refreshToken']['res'] = res;
});

When('we generate a genux token for {string}', async function (email) {
  this.users[email]['generateGenuxToken'] = {}
  const res = await this.httpAuthServer.post('generateGenuxToken', { json: { accessToken: this.users[email]['signIn']['res'].body.accessToken }, responseType: 'json'});
  this.users[email]['generateGenuxToken']['res'] = res;
});

When('we use the genux token for {string}', async function (email) {
  this.users[email]['useGenuxToken'] = {}
  try {
    const res = await this.httpAuthServer.post('useGenuxToken', { json: { genuxToken: this.users[email]['generateGenuxToken']['res'].body.genuxToken }, responseType: 'json'});
    this.users[email]['useGenuxToken']['res'] = res;
  } catch {
    this.users[email]['useGenuxToken']['res'] = { statusCode: 400 };
  }
});

Then('the access token of user {string} is different from the original one', function (email) {
  assert.notStrictEqual(this.users[email]['refreshToken']['res'].accessToken, this.users[email]['signIn']['res'].body.accessToken);
});

Then('the user {string} of {string} resulted in {string}', function(property, email, result) {
  statusCode = result === 'success' ? 200 : 400
  expect(this.users[email][property]['res'].statusCode).to.be.closeTo(statusCode, 10);
});

Then('the owner {string} of {string} resulted in {string}', function(property, email, result) {
  statusCode = result === 'success' ? 200 : 400
  expect(this.owners[email][property]['res'].statusCode).to.be.closeTo(statusCode, 10);
});
