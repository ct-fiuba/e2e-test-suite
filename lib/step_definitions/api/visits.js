const { Given, When, Then } = require('cucumber');
const assert = require('assert');
const chai = require('chai')
const got = require('got');
const expect = chai.expect
chai.use(require('chai-as-promised'))

When('the user with email {string} visited the space from establishment {string} {int} minutes ago with user data:', async function (email, establishment_name, minutes, dataTable) {
  this.visits[email] = {};
  try {
    const userGeneratedCode = `userGeneratedCode${(new Date()).toISOString()}`;
    const scanCode = this.establishments[establishment_name]['res']['body']['spaces'][0];
    const entranceTimestamp = new Date();
    entranceTimestamp.setMinutes(entranceTimestamp.getMinutes() - minutes);
    const req_body = {
      userGeneratedCode,
      scanCode,
      entranceTimestamp,
      ...buildVisitInformation(dataTable.rowsHash())
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
    this.visits[email]['userGeneratedCode'] = userGeneratedCode;
  } catch (err) {
    this.visits[email]['err'] = err;
    this.visits[email]['creation_success'] = false;
    this.visits[email]['status_code'] = 401;
  }
});

When('the user with email {string} closed the visit to the space from establishment {string} {int} minutes ago with user data:', async function (email, establishment_name, minutes, dataTable) {
  this.visits[email] = this.visits[email] || {};
  this.visits[email]['exit'] = {};
  try {
    const userGeneratedCode = this.visits[email]['userGeneratedCode'];
    const scanCode = this.establishments[establishment_name]['res']['body']['spaces'][0];
    const exitTimestamp = new Date();
    exitTimestamp.setMinutes(exitTimestamp.getMinutes() - minutes);
    const req_body = {
      userGeneratedCode,
      scanCode,
      exitTimestamp,
      ...buildVisitInformation(dataTable.rowsHash())
    };
    const headers = buildHeaders(this.users[email]['generateGenuxToken']['res']['body']['genuxToken']);
    const res = await this.http.post('visits/addExitTimestamp', {
      json: req_body,
      headers,
      responseType: 'json'
    });
    this.visits[email]['exit']['_id'] = res.body._id;
    this.visits[email]['exit']['status_code'] = res.statusCode;
    this.visits[email]['exit']['exit_success'] = res.statusCode === 201;
    this.visits[email]['exit']['res'] = res;
  } catch (err) {
    this.visits[email]['exit']['err'] = err;
    this.visits[email]['exit']['exit_success'] = false;
    this.visits[email]['exit']['status_code'] = 401;
  }
});

Then('the status code for the visit creation of the user with email {string} is {int}', function (email, statusCode) {
  assert.strictEqual(this.visits[email]['status_code'], statusCode);
});

Then('the status code for the visit exit of the user with email {string} is {int}', function (email, statusCode) {
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

const buildVisitInformation = (dataTable) => {
  typedDataTable = {};
  for (const [key, value] of Object.entries(dataTable)) {
    typedDataTable[key] = correctTypeFromKey(key, value);
  }
  return typedDataTable;
}

const correctTypeFromKey = (key, value) => {
  if (['vaccinated'].includes(key)) {
    return parseInt(value);
  }
  if (['covidRecovered'].includes(key)) {
    return value === 'true';
  }
  if (['vaccinatedDate', 'covidRecoveredDate'].includes(key)) {
    return new Date(value);
  }
  return value;
}
