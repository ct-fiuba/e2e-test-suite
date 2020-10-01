const got = require('got');

const { Before } = require('cucumber');

Before('@ct-api', function() {
  const client = got.extend({
    prefixUrl: 'http://localhost:5000'
  });
  this.http = client;
});

Before('@auth-server', function() {
  const client = got.extend({
    prefixUrl: 'http://localhost:5006'
  });
  this.http = client;
});
