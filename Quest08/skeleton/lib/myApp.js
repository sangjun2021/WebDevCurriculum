const http = require("http");
const File = require("./File");
const urlUtil = require("./url");
const contentType = require("./contentType");
class MyApp {
  #map = {};
  #res;
  #File;
  constructor(port) {
    http
      .createServer((req, res) => {
        const { path, query } = urlUtil(req.url);
        this.#res = res;
        this.#File = new File(req, res);
        !this.#map[req.method + path] && this.#notFound();
        try {
          this.#map[req.method + path](req, res, query);
        } catch (e) {
          console.error(e.message);
          this.#serverError();
        }
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
  put(url, callback) {
    this.#map["PUT" + url] = callback;
  }
  delete(url, callback) {
    this.#map["DELETE" + url] = callback;
  }
  #notFound() {
    this.#res.writeHeader(404);
    this.#res.end("404 Not Found");
  }
  #serverError() {
    this.#res.writeHeader(500);
    this.#res.end("server Error");
  }
  setMimeType(content) {
    this.#res.setHeader("Content-Type", contentType[content]);
  }
  dataUpload(fileName, callback) {
    this.#File.dataUpload(fileName, callback);
  }

  dataSend(fileName, callback) {
    this.#File.dataSend(fileName, callback);
  }
  readFile(file) {
    return this.#File.readFile(file, "utf-8");
  }
}

module.exports = MyApp;
