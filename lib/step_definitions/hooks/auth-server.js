const { Before, After } = require('cucumber');
const got = require('got');
require('dotenv').config();

Before('@auth-server', async function() {
  const client = got.extend({
    prefixUrl: `${process.env.AUTH_SERVER_URL}`
  });
  this.http = client;
  await this.http.get('ping');
  this.users = this.users || {};
});

After({tags: "@cleanUsers"}, async function () {
  for (var email in this.users){
    const userId = this.users[email]['signUp']['res'].body.userId;
    await this.http.post('deleteUser', { json: { userId: userId }, responseType: 'json'});
  }
  this.users = {};
});
