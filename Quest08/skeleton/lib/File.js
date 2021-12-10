const fs = require("fs");
const { finished } = require("stream/promises");

class File {
  #req;
  #res;
  constructor(req, res) {
    this.#req = req;
    this.#res = res;
  }
  async dataUpload(fileName) {
    const writeStream = fs.createWriteStream(fileName);
    this.#req.pipe(writeStream);
    return finished(writeStream);
  }

  dataSend(fileName) {
    const readStream = fs.createReadStream(fileName);
    readStream.on("open", () => {
      readStream.pipe(this.#res);
    });
    return finished(readStream);
  }
  readFile(fileName, encode) {
    return fs.readFileSync(fileName, encode);
  }
}

module.exports = File;
