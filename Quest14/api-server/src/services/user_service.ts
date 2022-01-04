import userModel from '../models/user';
import { userServcieType } from '../types/userService';

class UserService implements userServcieType {
  private userModel;

  constructor(model : any) {
    this.userModel = model;
  }

  async createUser(username : string, salt :string, password : string) : Promise<void> {
    try {
      this.userModel.create({
        username,
        salt,
        password,
      });
    } catch (e : any) {
      console.log('userService insert error : ', e.message);
    }
  }

  async getUserId(username : string) : Promise<number | undefined> {
    try {
      const currentUser = await this.userModel.findOne({
        attributes: ['id', 'username'],
        where: {
          username,
        },
      });
      const { id } = currentUser.dataValues;
      return id;
    } catch (e : any) {
      console.log('userService select error : ', e.message);
    }
  }

  async getUserPasswordList() : Promise<any> {
    try {
      const result = await this.userModel.findAll({
        attributes: ['username', 'salt', 'password'],
      });
      const listObject : any = {};
      result.forEach((record : {dataValues : any}) => {
        const { username } = record.dataValues;
        const { password } = record.dataValues;
        const { salt } = record.dataValues;
        listObject[username] = { password, salt };
      });
      return listObject;
    } catch (e : any) {
      console.log('userService select error : ', e.message);
    }
  }
}
const userService = new UserService(userModel);
export default userService;
