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
      .createServer(async (req, res) => {
        const { path, query } = urlUtil(req.url);
        this.#res = res;
        this.#File = new File(req, res);
        !this.#map[req.method + path] && this.#notFound();
        try {
          await this.#map[req.method + path](req, res, query);
        } catch (e) {
          console.error(e.message);
          this.#serverError();
        }
      })
      .listen(port, () => console.log(`server is running at :${port}`));
  }
  get(url, handleRequest) {
    this.#map["GET" + url] = handleRequest;
  }
  async post(url, handleRequest) {
    this.#map["POST" + url] = await handleRequest;
  }
  async put(url, handleRequest) {
    this.#map["PUT" + url] = await handleRequest;
  }
  async delete(url, handleRequest) {
    this.#map["DELETE" + url] = await handleRequest;
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
  async dataUpload(fileName) {
    return await this.#File.dataUpload(fileName);
  }

  async dataSend(fileName) {
    return await this.#File.dataSend(fileName);
  }
  async readFile(file) {
    return await this.#File.readFile(file, "utf-8");
  }
}

module.exports = MyApp;
