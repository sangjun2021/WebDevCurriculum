const fsPromise = require("fs/promises");
class File {
  async getFile(id) {
    try {
      const fileHandler = await fsPromise.open(`files/${id}.json`);
      return fileHandler.readFile({ encoding: "utf-8" });
    } catch (e) {
      return false;
    }
  }
  async deleteFile(id) {
    try {
      await fsPromise.unlink(`files/${id}.json`);
      return this.#deleteFileList(id);
    } catch (e) {
      return false;
    }
  }
  async writeFile(id, payLoad) {
    const data = await fsPromise.writeFile(
      `files/${id}.json`,
      JSON.stringify({ ...payLoad, id })
    );
    await this.#deleteFileList(id);
    await this.#addFileList(id, payLoad.title);
    return data;
  }
  async #addFileList(id, title) {
    const fileHandler = await fsPromise.open("files/fileList.txt");
    const file = await fileHandler.readFile({ encoding: "utf-8" });
    console.log("file : ", JSON.parse(file));
    const parsing = JSON.parse(file);
    const data = [...parsing, { id, title }];
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
