const { Given, When, Then } = require('cucumber');
const assert = require('assert');
const chai = require('chai')
const got = require('got');
const expect = chai.expect
chai.use(require('chai-as-promised'))

When('a new rule identified by the name {string} is created with fields:', async function (rule_name, dataTable) {
  this.rules[rule_name] = {conditions: []};
  this.rules[rule_name]['conditions'].push(buildRuleConditions(dataTable.rowsHash()));
  try {
    const res = await this.http.post('rules', {
      json: { rules: this.rules[rule_name]['conditions'] },
      headers: buildHeaders(this.admins[`${process.env.ADMIN_USER_EMAIL}`]['logIn']['res'].body.accessToken),
      responseType: 'json'
    });
    this.rules[rule_name]['_id'] = res.body;
    this.rules[rule_name]['status_code'] = res.statusCode;
    this.rules[rule_name]['creation_success'] = res.statusCode === 201;
    this.rules[rule_name]['res'] = res;
  } catch (err) {
    this.rules[rule_name]['err'] = err;
    this.rules[rule_name]['creation_success'] = false;
    this.rules[rule_name]['status_code'] = 401;
  }
});

Then('the status code for the rule {string} creation is {int}', function (rule_name, statusCode) {
  assert.strictEqual(this.rules[rule_name]['status_code'], statusCode);
});

const buildHeaders = (accessToken) => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'access-token': accessToken,
    'json': true
  };
}

const buildRuleConditions = (dataTable) => {
  typedDataTable = {};
  for (const [key, value] of Object.entries(dataTable)) {
    typedDataTable[key] = correctTypeFromKey(key, value);
  }
  return typedDataTable;
}

const correctTypeFromKey = (key, value) => {
  if (['index', 'durationValue', 'm2Value', 'vaccinated', 'vaccinatedDaysAgoMin', 'illnessRecoveredDaysAgoMax'].includes(key)) {
    return parseInt(value);
  }
  if (['n95Mandatory', 'illnessRecovered'].includes(key)) {
    return value === 'true';
  }
  if (key === 'contagionRisk') {
    return RiskStringToSeverity[value];
  }
  return value;
}

const RiskStringToSeverity = {
  'Alto': 0,
  'Medio': 1,
  'Bajo': 2,
};
