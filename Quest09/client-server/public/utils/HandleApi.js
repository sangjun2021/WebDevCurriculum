import API from "../api/index.js";
class HandleApi {
  #API = new API("http://localhost:8080");
  async getList() {
    try {
      const data = await this.#API.getFileList();
      return data;
    } catch (e) {
      console.log(e.message);
      return [];
    }
  }
  async insertFile(nextFile) {
    const nextState = await this.#API.createFile(nextFile);
    return nextState;
  }
  async createFile() {
    const file = {
      title: "untitled",
      text: "",
      isEdited: false,
    };
    const data = await this.insertFile(file);
    return JSON.parse(data);
  }
  async getFile(id) {
    const data = await this.#API.getFile(id);
    return JSON.parse(data);
  }
  async checkOverLap(title) {
    try {
      const isExist = await this.#API.CheckOverLap(title);
      if (isExist) throw new Error("중복된 파일이름입니다.");
      return false;
    } catch (e) {
      alert(e.message);
      return true;
    }
  }
  async updateFile(data) {
    const result = await this.#API.updateFile(data);
    return result;
  }
  async removeFile(id) {
    await this.#API.deleteFile(id);
    return;
  }
}

export default HandleApi;
