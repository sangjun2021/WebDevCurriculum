import { contextType } from '../../types/context';
import { paramasType } from '../../types/params';
import { resolverType } from '../../types/resolver';

const userResolver = async (_ : any, { token } : paramasType, { controller } : contextType) : Promise<resolverType> => {
  try {
    if (token === undefined) throw new Error();
    const username = controller.validateToken(token);
    if (!username) throw new Error('');
    await controller.setUser(username);
    return {
      username,
    };
  } catch (e) {
    return {
      error: true,
    };
  }
};

export default userResolver;
