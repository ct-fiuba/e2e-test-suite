const { Given, When, Then } = require('cucumber');
const assert = require('assert');
const chai = require('chai')
const got = require('got');
const expect = chai.expect
chai.use(require('chai-as-promised'))

When('the user with email {string} visited the space from establishment {string} {int} minutes ago', async function (email, establishment_name, minutes) {
  this.visits[email] = {};
  try {
    const userGeneratedCode = `userGeneratedCode${(new Date()).toISOString()}`;
    const scanCode = this.establishments[establishment_name]['res']['body']['spaces'][0];
    const entranceTimestamp = new Date();
    const req_body = {
      userGeneratedCode,
      scanCode,
      entranceTimestamp
    };
    const headers = buildHeaders(this.users[email]['generateGenuxToken']['res']['body']['genuxToken']);
    const res = await this.http.post('visits', {
      json: req_body,
      headers,
      responseType: 'json'
    });
    this.visits[email]['_id'] = res.body._id;
    this.visits[email]['status_code'] = res.statusCode;
    this.visits[email]['creation_success'] = res.statusCode === 201;
    this.visits[email]['res'] = res;
  } catch (err) {
    this.visits[email]['err'] = err;
    this.visits[email]['creation_success'] = false;
    this.visits[email]['status_code'] = 401;
  }
});

Then('the status code for the visit of the user with email {string} is {int}', function (email, statusCode) {
  assert.strictEqual(this.visits[email]['status_code'], statusCode);
});

const buildHeaders = (genuxToken) => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'genux-token': genuxToken,
    'json': true
  };
}
