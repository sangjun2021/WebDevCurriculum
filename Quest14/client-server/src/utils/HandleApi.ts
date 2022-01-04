import { postType } from '../types/post.d.ts';
import { apiType } from '../types/api.d.ts';
import { handleApiType } from '../types/handleApi.d.ts';

class HandleApi implements handleApiType {
  private API : apiType;

  constructor(api : apiType) {
    this.API = api;
  }

  async getList() : Promise<Array<postType> | boolean> {
    const result = await this.API.getFileList();
    return result;
  }

  async insertFile(nextFile : postType) : Promise<postType | boolean> {
    const result = await this.API.createFile(nextFile);
    return result;
  }

  async login(username :string, password : string) : Promise<string | false | undefined> {
    try {
      const result = await this.API.login(username, password);
      return result;
    } catch (e) {
      return false;
    }
  }

  async auth(): Promise<string | false | undefined> {
    const result = await this.API.auth();
    return result;
  }

  async logOut() : Promise<void> {
    const result = await this.API.logOut();
    return result;
  }

  async createFile() : Promise<postType | boolean> {
    const file = {
      title: 'untitled',
      text: '',
      isEdited: false,
    };
    const data = await this.insertFile(file);
    return data;
  }

  async getFile(id :string) : Promise<postType> {
    const data = await this.API.getFile(id);
    return data;
  }

  async checkOverLap(title : string) : Promise<boolean> {
    const result = await this.API.CheckOverLap(title);
    return result;
  }

  async updateFile(data : postType) : Promise<postType | boolean> {
    const reusult = await this.API.updateFile(data);
    return reusult;
  }

  async removeFile(id :string) : Promise<boolean> {
    const result = await this.API.deleteFile(id);
    return result;
  }
}

export default HandleApi;
