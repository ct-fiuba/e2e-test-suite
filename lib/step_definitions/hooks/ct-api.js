const got = require('got');
require('dotenv').config();

const { Before, After } = require('cucumber');

Before('@ct-api', async function() {
  const client = got.extend({
    prefixUrl: `${process.env.CT_API_URL}`
  });
  this.http = client;
  await this.http.get('ping');
  this.establishments = this.establishments || {};
  this.visits = this.visits || {};
  this.rules = this.rules || {};
  this.billboard = this.billboard || [];
});

After({tags: "@cleanEstablishments"}, async function () {
  this.establishments = {};
});

After({tags: "@cleanVisits"}, async function () {
  this.visits = {};
});

After({tags: "@cleanRules"}, async function () {
  for (var key in this.rules){
    await this.http.delete('rules', {
      json: { ruleIds: [this.rules[key]['_id']] },
      headers: buildHeaders(this.admins[`${process.env.ADMIN_USER_EMAIL}`]['logIn']['res'].body.accessToken),
      responseType: 'json'
    });
  }
  this.rules = {};
});

After({tags: "@cleanBillboard"}, async function () {
  this.billboard = [];
});

const buildHeaders = (accessToken) => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'access-token': accessToken,
    'json': true
  };
}
