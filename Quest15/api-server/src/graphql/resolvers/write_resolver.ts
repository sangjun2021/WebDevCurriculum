import { v4 as uuidv4 } from 'uuid';
import { contextType } from '../../types/context';
import { paramasType } from '../../types/params';
import { resolverType } from '../../types/resolver';

const writeResolver = async (
  _ : any,
  { id = uuidv4(), payLoad, token } : paramasType,
  { controller } : contextType,
) : Promise<resolverType> => {
  try {
    if (payLoad === undefined || token === undefined) throw new Error();
    const username = controller.validateToken(token);
    if (!username) throw new Error('');
    await controller.setUser(username);
    await controller.writeFile(id, payLoad);
    const post = await controller.getFile(id);
    return post;
  } catch (e) {
    return {
      error: true,
    };
  }
};

export default writeResolver;
