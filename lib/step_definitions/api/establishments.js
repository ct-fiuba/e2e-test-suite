const { Given, When, Then } = require('cucumber');

Given('the system is up and running', async function () {
  await this.http.get('ping');
});

Given('the establishment called {string} characteristics:', function (name, characteristics) {
  console.log('AAAAAA');
});

Given('{string} has a space with characteristics:', function (name, characteristics) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('the establishment {string} is created', function (name) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('the response is successful', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('the system has the establishment {string}', function (name) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});