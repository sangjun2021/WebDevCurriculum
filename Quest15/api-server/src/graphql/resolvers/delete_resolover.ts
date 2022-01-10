import { contextType } from '../../types/context';
import { paramasType } from '../../types/params';
import { resolverType } from '../../types/resolver';

const deleteResolver = async (_ : any, { id, token } : paramasType, { controller } : contextType) : Promise<resolverType> => {
  try {
    if (token === undefined || id === undefined) throw new Error();
    const username = controller.validateToken(token);
    if (!username) throw new Error('');
    await controller.setUser(username);
    await controller.deleteFile(id);
    return {
      error: false,
    };
  } catch (e) {
    return {
      error: true,
    };
  }
};

export default deleteResolver;
