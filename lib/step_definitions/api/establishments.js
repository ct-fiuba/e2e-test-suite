const { Given, When, Then } = require('cucumber');
const assert = require('assert');
const chai = require('chai')
const got = require('got');
const expect = chai.expect
chai.use(require('chai-as-promised'))

Given('the establishment called {string} has characteristics:', function (establishment_name, characteristics) {
  const current_establishment = characteristics.rowsHash();
  this.establishments[establishment_name] = current_establishment;
  this.establishments[establishment_name]['spaces'] = [];
});

Given('{string} has a space with characteristics:', function (establishment_name, characteristics) {
  this.establishments[establishment_name]['spaces'].push(characteristics.rowsHash());
});

Given('the owner with email {string} owns the establishment {string}', function (owner_email, establishment_name) {
  this.establishments[establishment_name]['ownerId'] = this.owners[owner_email]['signUp']['res'].body.userId;
  this.establishments[establishment_name]['accessToken'] = this.owners[owner_email]['signUp']['res'].body.accessToken;
});

Given('the establishment {string} with a space owned by {string} exists', async function (establishment_name, owner_email) {
  const current_establishment = require('../../data/establishment.json');
  const current_space = require('../../data/space.json');

  this.establishments[establishment_name] = current_establishment;
  this.establishments[establishment_name]['spaces'] = [current_space];
  this.establishments[establishment_name]['ownerId'] = this.owners[owner_email]['signUp']['res'].body.userId;
  this.establishments[establishment_name]['accessToken'] = this.owners[owner_email]['signUp']['res'].body.accessToken;

  const res = await this.http.post('establishments', {
    json: this.establishments[establishment_name],
    headers: buildHeaders(this.establishments[establishment_name]['accessToken']),
    responseType: 'json'
  });
  this.establishments[establishment_name]['_id'] = res.body._id;
  this.establishments[establishment_name]['status_code'] = res.statusCode;
});

When('the establishment {string} is created', async function (establishment_name) {
  try {
    const res = await this.http.post('establishments', {
      json: this.establishments[establishment_name],
      headers: buildHeaders(this.establishments[establishment_name]['accessToken']),
      responseType: 'json'
    });
    this.establishments[establishment_name]['_id'] = res.body._id;
    this.establishments[establishment_name]['status_code'] = res.statusCode;
    this.establishments[establishment_name]['creation_success'] = res.statusCode === 201;
    this.establishments[establishment_name]['res'] = res;
  } catch (err) {
    this.establishments[establishment_name]['err'] = err;
    this.establishments[establishment_name]['creation_success'] = false;
    this.establishments[establishment_name]['status_code'] = 401;
  }
});

Then('the system has the establishment {string}', async function (establishment_name) {
  assert.strictEqual(this.establishments[establishment_name]['creation_success'], true);
  const res = await this.http.get(`establishments/${this.establishments[establishment_name]['_id']}`, {
    headers: buildHeaders(this.establishments[establishment_name]['accessToken']),
    responseType: 'json'
  });
  assert.strictEqual(res.body['_id'], this.establishments[establishment_name]['_id']);
  assert.strictEqual(res.body['type'], this.establishments[establishment_name]['type']);
  assert.strictEqual(res.body['name'], this.establishments[establishment_name]['name']);
  assert.strictEqual(res.body['address'], this.establishments[establishment_name]['address']);
  assert.strictEqual(res.body['city'], this.establishments[establishment_name]['city']);
  assert.strictEqual(res.body['state'], this.establishments[establishment_name]['state']);
  assert.strictEqual(res.body['zip'], this.establishments[establishment_name]['zip']);
});

Then('the system does not have the establishment {string}', async function (establishment_name) {
  assert.strictEqual(this.establishments[establishment_name]['creation_success'], false);
});


Then('the system has {int} spaces for the establishment {string}', async function (num_spaces, establishment_name) {
  const res = await this.http.get(`establishments/${this.establishments[establishment_name]['_id']}`, {
    headers: buildHeaders(this.establishments[establishment_name]['accessToken']),
    responseType: 'json'
  });
  assert.strictEqual(res.body['spaces'].length, num_spaces);
});

Then('the status code for establishment {string} creation is {int}', function (establishment_name, statusCode) {
  assert.strictEqual(this.establishments[establishment_name]['status_code'], statusCode);
});

When('the PDF for the establishment {string} is requested', async function (establishment_name) {
  try {
    const res = await await this.http.get(`establishments/PDF/${this.establishments[establishment_name]['_id']}`);
    this.establishments[establishment_name]['status_code_pdf'] = res.statusCode;
    this.establishments[establishment_name]['content_type_pdf'] = res.headers['content-type'];
    this.establishments[establishment_name]['content_disposition_pdf'] = res.headers['content-disposition'];
  } catch (err) {
    this.establishments[establishment_name]['status_code_pdf'] = 400;
  }
});

Then('the status code for the PDF generation for {string} is {int}', function (establishment_name, statusCode) {
  assert.strictEqual(this.establishments[establishment_name]['status_code_pdf'], statusCode);
});

Then('the response for the PDF generation for {string} has type application pdf', function (establishment_name) {
  assert.strictEqual(this.establishments[establishment_name]['content_type_pdf'], 'application/pdf');
});

Then('the response for the PDF generation for {string} has an attachment', function (establishment_name) {
  assert(this.establishments[establishment_name]['content_disposition_pdf'].includes('attachment'));
});

const buildHeaders = (accessToken) => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'access-token': accessToken,
    'json': true
  };
}