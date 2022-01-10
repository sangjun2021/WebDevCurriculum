import userService from '../services/user_service';
import { userControllerType } from '../types/userController';
import { userServcieType } from '../types/userService';

class UserController implements userControllerType {
  private service : userServcieType;

  private currentUser : number | undefined = undefined;

  constructor(service : userServcieType) {
    this.service = service;
  }

  async createUser(username :string, salt : string, password : string) : Promise<void> {
    await this.service.createUser(username, salt, password);
  }

  async getUserPasswordList() : Promise<any> {
    const result = await this.service.getUserPasswordList();
    return result;
  }

  async getUserId(username : string) : Promise<number | undefined> {
    const result = await this.service.getUserId(username);
    return result;
  }

  async setUser(username : string) : Promise<void> {
    const userId = await this.service.getUserId(username);
    this.currentUser = userId;
  }
}
const userController = new UserController(userService);
export default userController;
