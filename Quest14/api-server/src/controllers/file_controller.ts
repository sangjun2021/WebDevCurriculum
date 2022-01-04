import { fileControllerType } from '../types/fileController';
import { postType } from '../types/post';

const fsPromise = require('fs/promises');

class FileController implements fileControllerType {
  private user : string | undefined;

  async getFile(id : string) : Promise<string | boolean> {
    try {
      const fileHandler = await fsPromise.open(`${this.user}/${id}.json`);
      const data = await fileHandler.readFile({ encoding: 'utf-8' });
      await fileHandler.close();
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  setUser(user : string) : boolean {
    this.user = user;
    return true;
  }

  getUser() : string | undefined {
    return this.user;
  }

  async getUserPasswordList() : Promise<string | boolean> {
    try {
      const fileHandler = await fsPromise.open('userList/userPassword.json');
      const data = await fileHandler.readFile({ encoding: 'utf-8' });
      await fileHandler.close();
      return data;
    } catch (e) {
      return false;
    }
  }

  async deleteFile(id : string) : Promise<string | boolean> {
    try {
      await fsPromise.unlink(`${this.user}/${id}.json`);
      return await this.deleteFileList(id);
    } catch (e) {
      return false;
    }
  }

  async writeFile(id : string, payLoad : postType) : Promise<string> {
    const data = await fsPromise.writeFile(
      `${this.user}/${id}.json`,
      JSON.stringify({ ...payLoad, id }),
    );
    await this.deleteFileList(id);
    await this.addFileList(id, payLoad.title);
    return data;
  }

  private async addFileList(id : string, title : string | undefined) {
    const fileHandler = await fsPromise.open(`${this.user}/fileList.txt`);
    const file = await fileHandler.readFile({ encoding: 'utf-8' });
    const parsing = JSON.parse(file);
    const data = [...parsing, { id, title }];
    const newData = JSON.stringify(data);
    const result = await fsPromise.writeFile(
      `${this.user}/fileList.txt`,
      newData,
    );
    await fileHandler.close();
    return result;
  }

  private async deleteFileList(id : string) : Promise<string> {
    const fileHandler = await fsPromise.open(`${this.user}/fileList.txt`);
    const file = await fileHandler.readFile({ encoding: 'utf-8' });
    const data = JSON.parse(file).filter((post : postType) => post.id !== id);
    const newData = JSON.stringify(data);
    const result = await fsPromise.writeFile(
      `${this.user}/fileList.txt`,
      newData,
    );
    await fileHandler.close();
    return result;
  }

  async getFileList() : Promise<Array<postType>> {
    const fileHandler = await fsPromise.open(`${this.user}/fileList.txt`);
    const result = await fileHandler.readFile({ encoding: 'utf-8' });
    await fileHandler.close();
    return JSON.parse(result);
  }
}

module.exports = File;
