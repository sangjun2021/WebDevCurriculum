const fsPromise = require("fs/promises");
class File {
  async getFile(id) {
    const fileHandler = await fsPromise.open(`files/${id}.json`);
    return fileHandler.readFile({ encoding: "utf-8" });
  }
  async deleteFile(id) {
    await fsPromise.unlink(`files/${id}.json`);
    return this.#deleteFileList(id);
  }
  async writeFile(id, title, text) {
    await fsPromise.writeFile(
      `files/${id}.json`,
      JSON.stringify({ title, text })
    );
    await this.#deleteFileList(id);
    return this.#addFileList(id, title);
  }
  async #addFileList(id, title, text) {
    const fileHandler = await fsPromise.open("files/fileList.txt");
    const file = await fileHandler.readFile({ encoding: "utf-8" });
    console.log("file : ", JSON.parse(file));
    const parsing = JSON.parse(file);
    const data = [...parsing, { id, text }];
    const newData = JSON.stringify(data);
    return fsPromise.writeFile("files/fileList.txt", newData);
  }
  async #deleteFileList(id) {
    const fileHandler = await fsPromise.open("files/fileList.txt");
    const file = await fileHandler.readFile({ encoding: "utf-8" });
    const data = JSON.parse(file).filter((post) => post.id !== id);
    const newData = JSON.stringify(data);
    return fsPromise.writeFile("files/fileList.txt", newData);
  }
  async getFileList() {
    const fileHandler = await fsPromise.open("files/fileList.txt");
    return fileHandler.readFile({ encoding: "utf-8" });
  }
}

module.exports = File;
