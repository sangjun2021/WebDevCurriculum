const http = require("http");

class MyApp {
  #map = {};
  constructor(port) {
    http
      .createServer((req, res) => {
        this.#map[req.method + req.url] &&
          this.#map[req.method + req.url](req, res);
      })
      .listen(port);
    console.log(`server is running at :${port}`);
  }
  get(url, callback) {
    this.#map["GET" + url] = callback;
  }
  post(url, callback) {
    this.#map["POST" + url] = callback;
  }
}

module.exports = MyApp;
