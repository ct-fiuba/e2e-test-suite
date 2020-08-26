class HttpClient {
  constructor(client) {
    this.client = client;
    this.request = {};
  }

  withHeaders(headers) {
    this.request.headers = headers;
    return this;
  }

  withBody(body) {
    this.request.data = body;
    return this;
  }

  withUrl(url) {
    this.request.url = url;
    return this;
  }

  withMethod(method) {
    this.request.method = method;
    return this;
  }

  send() {
    return this.client.request(this.request);
  }
}

module.exports = HttpClient;
