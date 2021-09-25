const { Given, When, Then, After, setDefaultTimeout } = require('cucumber');
setDefaultTimeout(60 * 1000);
const assert = require('assert');
const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))

Given('the user with email {string}, DNI {string} and password {string} was created', async function (email, dni, password) {
  this.users[email] = this.users[email] || { signUp: {}, logIn: {} };
  const res = await this.httpAuthServer.post('users/signUp', { json: { email: email, DNI: dni, password: password }, responseType: 'json' });
  this.users[email]['signUp']['res'] = res;
});

When('the user with email {string}, DNI {string} and password {string} is created', async function (email, dni, password) {
  this.users[email] = this.users[email] || { signUp: {}, logIn: {} };
  const res = await this.httpAuthServer.post('users/signUp', { json: { email: email, DNI: dni, password: password }, responseType: 'json' });
  this.users[email]['signUp']['res'] = res;
});

When('the user log in with email {string} and password {string}', async function (email, password) {
  this.users[email] = this.users[email] || { signUp: {}, logIn: {} };
  try {
    const res = await this.httpAuthServer.post('users/logIn', { json: { email: email, password: password }, responseType: 'json' });
    this.users[email]['logIn']['res'] = res;
  } catch (err) {
    this.users[email]['logIn']['res'] = { statusCode: 400 }
  }
});

When('the admin logs in', async function () {
  const email = `${process.env.ADMIN_USER_EMAIL}`;
  const password = `${process.env.ADMIN_USER_PASSWORD}`;
  this.admins[email] = this.admins[email] || { logIn: {} };
  try {
    const res = await this.httpAuthServer.post('admins/logIn', { json: { email: email, password: password }, responseType: 'json' });
    this.admins[email]['logIn']['res'] = res;
  } catch (err) {
    this.admins[email]['logIn']['res'] = { statusCode: 400 }
  }
});

When('we validate the user access token of {string}', async function (email) {
  this.users[email]['validateAccessToken'] = {}
  const res = await this.httpAuthServer.post('users/validateAccessToken', { json: { accessToken: this.users[email]['logIn']['res'].body.accessToken }, responseType: 'json' });
  this.users[email]['validateAccessToken']['res'] = res;
});

When('we validate the user access token of {string} as an owner access token', async function (email) {
  try {
    this.users[email]['validateAccessToken'] = {}
    const res = await this.httpAuthServer.post('owners/validateAccessToken', { json: { accessToken: this.users[email]['logIn']['res'].body.accessToken }, responseType: 'json' });
    this.users[email]['validateAccessToken']['res'] = res;
  } catch (err) {
    this.users[email]['validateAccessToken']['res'] = { statusCode: 404 }
  }
});

Given('the owner with email {string} and password {string} was created', async function (email, password) {
  this.owners[email] = this.owners[email] || { signUp: {}, logIn: {} };
  const res = await this.httpAuthServer.post('owners/signUp', { json: { email: email, password: password }, responseType: 'json' });
  this.owners[email]['signUp']['res'] = res;
});

When('the owner with email {string} and password {string} is created', async function (email, password) {
  this.owners[email] = this.owners[email] || { signUp: {}, logIn: {} };
  const res = await this.httpAuthServer.post('owners/signUp', { json: { email: email, password: password }, responseType: 'json' });
  this.owners[email]['signUp']['res'] = res;
});

When('the owner log in with email {string} and password {string}', async function (email, password) {
  this.owners[email] = this.owners[email] || { signUp: {}, logIn: {} };
  try {
    const res = await this.httpAuthServer.post('owners/logIn', { json: { email: email, password: password }, responseType: 'json' });
    this.owners[email]['logIn']['res'] = res;
  } catch (err) {
    this.owners[email]['logIn']['res'] = { statusCode: 400 }
  }
});

When('we validate the owner access token of {string}', async function (email) {
  this.owners[email]['validateAccessToken'] = {}
  const res = await this.httpAuthServer.post('owners/validateAccessToken', { json: { accessToken: this.owners[email]['logIn']['res'].body.accessToken }, responseType: 'json' });
  this.owners[email]['validateAccessToken']['res'] = res;
});

When('we validate the owner access token of {string} as a user access token', async function (email) {
  try {
    this.owners[email]['validateAccessToken'] = {}
    const res = await this.httpAuthServer.post('users/validateAccessToken', { json: { accessToken: this.owners[email]['logIn']['res'].body.accessToken }, responseType: 'json' });
    this.owners[email]['validateAccessToken']['res'] = res;
  } catch (err) {
    this.owners[email]['validateAccessToken']['res'] = { statusCode: 404 }
  }
});

When('we refresh the user access token of {string}', async function (email) {
  this.users[email]['refreshToken'] = {}
  const res = await this.httpAuthServer.post('refreshToken', { json: { refreshToken: this.users[email]['logIn']['res'].body.refreshToken }, responseType: 'json' });
  this.users[email]['refreshToken']['res'] = res;
});

When('we generate a genux token for {string}', async function (email) {
  this.users[email]['generateGenuxToken'] = {}
  const res = await this.httpAuthServer.post('generateGenuxToken', { json: { accessToken: this.users[email]['logIn']['res'].body.accessToken }, responseType: 'json' });
  this.users[email]['generateGenuxToken']['res'] = res;
});

When('we use the genux token for {string}', async function (email) {
  this.users[email]['useGenuxToken'] = {}
  try {
    const res = await this.httpAuthServer.post('useGenuxToken', { json: { genuxToken: this.users[email]['generateGenuxToken']['res'].body.genuxToken }, responseType: 'json' });
    this.users[email]['useGenuxToken']['res'] = res;
  } catch {
    this.users[email]['useGenuxToken']['res'] = { statusCode: 400 };
  }
});

Then('the access token of user {string} is different from the original one', function (email) {
  assert.notStrictEqual(this.users[email]['refreshToken']['res'].accessToken, this.users[email]['logIn']['res'].body.accessToken);
});

Then('the user {string} of {string} resulted in {string}', function (property, email, result) {
  statusCode = result === 'success' ? 200 : 400
  expect(this.users[email][property]['res'].statusCode).to.be.closeTo(statusCode, 10);
});

Then('the owner {string} of {string} resulted in {string}', function (property, email, result) {
  statusCode = result === 'success' ? 200 : 400
  expect(this.owners[email][property]['res'].statusCode).to.be.closeTo(statusCode, 10);
});

Then('the admin {string} resulted in {string}', function (property, result) {
  const email = `${process.env.ADMIN_USER_EMAIL}`;
  statusCode = result === 'success' ? 200 : 400
  expect(this.admins[email][property]['res'].statusCode).to.be.closeTo(statusCode, 10);
});
