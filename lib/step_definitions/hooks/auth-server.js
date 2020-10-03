const { Before, After } = require('cucumber');
const got = require('got');

Before('@auth-server', async function() {
  const client = got.extend({
    prefixUrl: 'http://localhost:5006'
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
