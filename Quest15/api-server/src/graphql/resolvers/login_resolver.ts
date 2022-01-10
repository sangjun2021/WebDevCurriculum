import { contextType } from '../../types/context';
import { paramasType } from '../../types/params';
import { resolverType } from '../../types/resolver';

const loginResolver = async (_ : any, { loginForm } : paramasType, { controller } : contextType) : Promise<resolverType> => {
  try {
    if (loginForm === undefined) throw new Error();
    const { username, password } = loginForm;
    const userList = await controller.getUserPasswordList();
    if (username === undefined || password === undefined) throw new Error();
    const userInfo = userList[username];
    const result = await controller.validateKey(
      password,
      userInfo.salt,
      userInfo.password,
    );
    if (!result) throw new Error();
    const token = controller.createToken(username);
    return { token };
  } catch (e) {
    console.log(e);
    return {
      error: true,
    };
  }
};

export default loginResolver;
