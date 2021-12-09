const fs = require("fs");

class File {
  #req;
  #res;
  constructor(req, res) {
    this.#req = req;
    this.#res = res;
  }
  dataUpload(fileName, callback) {
    const writeStream = fs.createWriteStream(fileName);
    this.#req.pipe(writeStream);
    writeStream.on("finish", () => {
      callback();
    });
  }

  dataSend(fileName, callback) {
    const readStream = fs.createReadStream(fileName);
    readStream.on("open", () => {
      readStream.pipe(this.#res);
    });
    readStream.on("finish", () => {
      callback();
    });
  }
  readFile(fileName, encode) {
    return fs.readFileSync(fileName, encode);
  }
}

module.exports = File;
