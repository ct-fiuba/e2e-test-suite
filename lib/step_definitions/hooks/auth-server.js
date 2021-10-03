const { Before, After } = require('cucumber');
const got = require('got');
require('dotenv').config();

Before('@auth-server', async function() {
  const client = got.extend({
    prefixUrl: `${process.env.AUTH_SERVER_URL}`
  });
  this.httpAuthServer = client;
  await this.httpAuthServer.get('ping');
  this.users = this.users || {};
  this.owners = this.owners || {};
  this.admins = this.admins || {};
});

After({tags: "@cleanUsers"}, async function () {
  for (var email in this.users){
    const userId = this.users[email]['signUp']['res'].body.userId;
    await this.httpAuthServer.post('deleteUser', { json: { userId: userId }, responseType: 'json'});
  }
  this.users = {};
});

After({tags: "@cleanOwners"}, async function () {
  for (var email in this.owners){
    const userId = this.owners[email]['signUp']['res'].body.userId;
    await this.httpAuthServer.post('deleteUser', { json: { userId: userId }, responseType: 'json'});
  }
  this.owners = {};
});

After({tags: "@cleanAdmins"}, async function () {
  this.admins = {};
});
