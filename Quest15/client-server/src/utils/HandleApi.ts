import { postType, apiType, storageType } from '../types';

class HandleApi implements storageType {
  private API : apiType;

  constructor(api : apiType) {
    this.API = api;
  }

  async getList() : Promise<Array<postType | boolean>> {
    const result = await this.API.getFileList();
    return result;
  }

  async insertFile(nextFile : postType) : Promise<postType> {
    const result = await this.API.createFile(nextFile);
    if (typeof result === 'boolean') return {};
    return result;
  }

  async login(username :string, password : string) : Promise<string | false> {
    const result = await this.API.login(username, password);
    return result;
  }

  async auth(): Promise<string | false> {
    const result = await this.API.auth();
    return result;
  }

  async logOut() : Promise<void> {
    await this.API.logout();
  }

  async createFile() : Promise<postType | boolean> {
    const file : postType = {
      title: 'untitled',
      text: '',
      isEdited: false,
    };
    const data = await this.insertFile(file);
    return data;
  }

  async getFile(id :string) : Promise<postType | boolean> {
    const data = await this.API.getFile(id);
    return data;
  }

  async checkOverLap(title : string) : Promise<boolean> {
    const result = await this.API.checkOverLap(title);
    return result;
  }

  async updateFile(data : postType) : Promise<postType | boolean> {
    const reusult = await this.API.updateFile(data);
    return reusult;
  }

  async removeFile(id :string) : Promise<void> {
    await this.API.deleteFile(id);
  }
}

export default HandleApi;
