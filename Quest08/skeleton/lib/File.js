const fs = require("fs");
const fsPromise = require("fs/promises");
const { finished } = require("stream/promises");
const delay = (second) =>
  new Promise((res) => {
    setTimeout(() => res(), second * 1000);
  });
class File {
  #req;
  #res;
  constructor(req, res) {
    this.#req = req;
    this.#res = res;
  }
  async dataUpload(fileName) {
    await delay(2);
    const writeStream = fs.createWriteStream(fileName);
    this.#req.pipe(writeStream);
    return await finished(writeStream);
  }

  async dataSend(fileName) {
    const readStream = fs.createReadStream(fileName);
    readStream.on("open", () => {
      readStream.pipe(this.#res);
    });
    return await finished(readStream);
  }
  async readFile(fileName, encode) {
    return await fsPromise.readFile(fileName, { encoding: encode });
  }
}

module.exports = File;
