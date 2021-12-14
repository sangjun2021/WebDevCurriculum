const fsPromise = require("fs/promises");
class File {
  async getFile(user, id) {
    try {
      const fileHandler = await fsPromise.open(`${user}/${id}.json`);
      const data = await fileHandler.readFile({ encoding: "utf-8" });
      await fileHandler.close();
      return data;
    } catch (e) {
      return false;
    }
  }
  async deleteFile(user, id) {
    try {
      await fsPromise.unlink(`${user}/${id}.json`);
      return await this.#deleteFileList(id);
    } catch (e) {
      return false;
    }
  }
  async writeFile(user, id, payLoad) {
    const data = await fsPromise.writeFile(
      `${user}/${id}.json`,
      JSON.stringify({ ...payLoad, id })
    );
    await this.#deleteFileList(id);
    await this.#addFileList(id, payLoad.title);
    return data;
  }
  async #addFileList(user, id, title) {
    const fileHandler = await fsPromise.open(`${user}/fileList.txt`);
    const file = await fileHandler.readFile({ encoding: "utf-8" });
    const parsing = JSON.parse(file);
    const data = [...parsing, { id, title }];
    const newData = JSON.stringify(data);
    const result = await fsPromise.writeFile(`${user}/fileList.txt`, newData);
    await fileHandler.close();
    return result;
  }
  async #deleteFileList(user, id) {
    const fileHandler = await fsPromise.open(`${user}/fileList.txt`);
    const file = await fileHandler.readFile({ encoding: "utf-8" });
    const data = JSON.parse(file).filter((post) => post.id !== id);
    const newData = JSON.stringify(data);
    const result = await fsPromise.writeFile(`${user}/fileList.txt`, newData);
    await fileHandler.close();
    return result;
  }
  async getFileList(user) {
    const fileHandler = await fsPromise.open(`${user}/fileList.txt`);
    const result = await fileHandler.readFile({ encoding: "utf-8" });
    await fileHandler.close();
    return result;
  }
}

module.exports = File;
