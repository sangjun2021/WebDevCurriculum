import dbController from './db_controller';
import hashController from './hash_controller';
import jwtController from './jwt_controller';
import { dbControllerType } from '../types/dbController';
import { hashControllerType } from '../types/hashController';
import { jwtControllerType } from '../types/jwt';
import { postType } from '../types/post';
import { controllerType } from '../types/controller';

class Controller implements controllerType {
  private dataController : dbControllerType;

  private hashController : hashControllerType;

  private jwtController : jwtControllerType;

  constructor(dataController : dbControllerType, hashController : hashControllerType, jwtController: jwtControllerType) {
    this.dataController = dataController;
    this.hashController = hashController;
    this.jwtController = jwtController;
  }

  async getFile(id : string) : Promise<postType> {
    const reuslt = this.dataController.getFile(id);
    return reuslt;
  }

  async setUser(user :string) : Promise<void> {
    const result = await this.dataController.setUser(user);
    return result;
  }

  async getUserPasswordList() : Promise<any> {
    const result = await this.dataController.getUserPasswordList();
    return result;
  }

  async deleteFile(id : string) : Promise<void> {
    const reuslt = await this.dataController.deleteFile(id);
    return reuslt;
  }

  async writeFile(id : string, payLoad : postType) : Promise<void> {
    const result = await this.dataController.writeFile(id, payLoad);
    return result;
  }

  async getFileList() : Promise<Array<postType> | undefined> {
    const result = await this.dataController.getFileList();
    return result;
  }

  async createKey(key :string, salt : string) : Promise<{result : string, salt : string}> {
    const result = await this.hashController.createKey(key, salt);
    return result;
  }

  async validateKey(key : string, salt : string, value: string) : Promise<boolean> {
    const result = await this.hashController.validateKey(key, salt, value);
    return result;
  }

  createToken(username : string) : string {
    return this.jwtController.createToken(username);
  }

  validateToken(token : string) : string {
    return this.jwtController.validateToken(token);
  }
}
const controller = new Controller(dbController, hashController, jwtController);

export default controller;
