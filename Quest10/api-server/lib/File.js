const fsPromise = require("fs/promises");
class File {
  #user;
  async getFile(id) {
    try {
      const fileHandler = await fsPromise.open(`${this.#user}/${id}.json`);
      const data = await fileHandler.readFile({ encoding: "utf-8" });
      await fileHandler.close();
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  setUser(user) {
    this.#user = user;
    return true;
  }
  async getUserPasswordList() {
    try {
      const fileHandler = await fsPromise.open(`userList/userPassword.json`);
      const data = await fileHandler.readFile({ encoding: "utf-8" });
      await fileHandler.close();
      return data;
    } catch (e) {
      return false;
    }
  }
  async deleteFile(id) {
    try {
      await fsPromise.unlink(`${this.#user}/${id}.json`);
      return await this.#deleteFileList(id);
    } catch (e) {
      return false;
    }
  }
  async writeFile(id, payLoad) {
    const data = await fsPromise.writeFile(
      `${this.#user}/${id}.json`,
      JSON.stringify({ ...payLoad, id })
    );
    await this.#deleteFileList(id);
    await this.#addFileList(id, payLoad.title);
    return data;
  }
  async #addFileList(id, title) {
    const fileHandler = await fsPromise.open(`${this.#user}/fileList.txt`);
    const file = await fileHandler.readFile({ encoding: "utf-8" });
    const parsing = JSON.parse(file);
    const data = [...parsing, { id, title }];
    const newData = JSON.stringify(data);
    const result = await fsPromise.writeFile(
      `${this.#user}/fileList.txt`,
      newData
    );
    await fileHandler.close();
    return result;
  }
  async #deleteFileList(id) {
    const fileHandler = await fsPromise.open(`${this.#user}/fileList.txt`);
    const file = await fileHandler.readFile({ encoding: "utf-8" });
    const data = JSON.parse(file).filter((post) => post.id !== id);
    const newData = JSON.stringify(data);
    const result = await fsPromise.writeFile(
      `${this.#user}/fileList.txt`,
      newData
    );
    await fileHandler.close();
    return result;
  }
  async getFileList() {
    const fileHandler = await fsPromise.open(`${this.#user}/fileList.txt`);
    const result = await fileHandler.readFile({ encoding: "utf-8" });
    await fileHandler.close();
    return result;
  }
}

module.exports = File;
