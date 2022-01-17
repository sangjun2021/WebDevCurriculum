import { postType } from './post';

export interface controllerType {
  async getFile(id : string) : Promise<postType>
  async setUser(user :string) : Promise<void>
  async getUserPasswordList() : Promise<any>
  async deleteFile(id : string) : Promise<void>
  async writeFile(id : string, payLoad : postType) : Promise<void>
  async getFileList() : Promise<Array<postType> | undefined>
  async createKey(key :string, salt : string) : Promise<{result : string, salt : string}>
  async validateKey(key : string, salt : string, value: string) : Promise<boolean>
  createToken(username : string) : string
  validateToken(token : string) : string
}
