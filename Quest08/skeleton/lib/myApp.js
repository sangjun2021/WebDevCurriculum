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
    console.error(`server is running at :${port}`);
  }
  get(url, callback) {
    try {
      this.#map["GET" + url] = callback;
    } catch (e) {
      console.error(e.message);
    }
  }
  post(url, callback) {
    try {
      this.#map["POST" + url] = callback;
    } catch (e) {
      console.error(e.message);
    }
  }
  put(url, callback) {
    try {
      this.#map["PUT" + url] = callback;
    } catch (e) {
      console.error(e.message);
    }
  }
  delete(url, callback) {
    try {
      this.#map["DELETE" + url] = callback;
    } catch (e) {
      console.error(e.meesage);
    }
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
    try {
      this.#res.setHeader("Content-Type", contentType[content]);
    } catch (e) {
      console.error(e.message);
      this.#serverError();
    }
  }
  dataUpload(fileName) {
    try {
      return this.#File.dataUpload(fileName);
    } catch (e) {
      console.error(e.message);
      this.#serverError();
    }
  }

  dataSend(fileName) {
    try {
      return this.#File.dataSend(fileName);
    } catch (e) {
      console.error(e.message);
      this.#serverError();
    }
  }
  readFile(file) {
    try {
      return this.#File.readFile(file, "utf-8");
    } catch (e) {
      console.error(e.message);
      this.#serverError();
    }
  }
}

module.exports = MyApp;
