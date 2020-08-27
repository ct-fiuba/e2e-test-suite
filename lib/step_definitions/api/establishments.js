const { Given, When, Then } = require('cucumber');
const assert = require('assert');
const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))

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
  try {
    const res = await this.http.post('establishments', { json: this.establishment_name, responseType: 'json' });
    this.establishment_name['_id'] = res.body._id;
    this.establishment_name['status_code'] = res.statusCode;
  } catch (err) {
    this.establishment_name['_id'] = 0;
    this.establishment_name['status_code'] = 401;
  }
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

Then('the system does not have the establishment {string}', async function (establishment_name) {
  await expect(
    this.http.get(`establishments/${this.establishment_name['_id']}`, {responseType: 'json'})
  ).to.be.rejectedWith(Error);
});


Then('the system has {int} spaces for the establishment {string}', async function (num_spaces, establishment_name) {
  const res = await this.http.get(`establishments/${this.establishment_name['_id']}`, {responseType: 'json'});
  assert.equal(res.body['spaces'].length, num_spaces);
});

Then('the status code for establishment {string} creation is {int}', function (establishment_name, statusCode) {
  assert.equal(this.establishment_name['status_code'], statusCode);
});

When('the PDF for the establishment {string} is requested', async function (establishment_name) {
  try {
    const res = await await this.http.get(`establishments/PDF/${this.establishment_name['_id']}`);
    this.establishment_name['status_code_pdf'] = res.statusCode;
    this.establishment_name['content_type_pdf'] = res.headers['content-type'];
    this.establishment_name['content_disposition_pdf'] = res.headers['content-disposition'];
  } catch (err) {
    this.establishment_name['status_code_pdf'] = 400;
  }
});

Then('the status code for the PDF generation for {string} is {int}', function (establishment_name, statusCode) {
  assert.equal(this.establishment_name['status_code_pdf'], statusCode);
});

Then('the response for the PDF generation for {string} has type application pdf', function (establishment_name) {
  assert.equal(this.establishment_name['content_type_pdf'], 'application/pdf');
});

Then('the response for the PDF generation for {string} has an attachment', function (establishment_name) {
  assert(this.establishment_name['content_disposition_pdf'].includes('attachment'));
});
