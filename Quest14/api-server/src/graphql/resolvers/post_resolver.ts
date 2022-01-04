import { contextType } from '../../types/context';
import { paramasType } from '../../types/params';
import { resolverType } from '../../types/resolver';

const postResolver = async (_ : any, { id } : paramasType, { controller } : contextType) : Promise<resolverType> => {
  try {
    if (id === undefined) throw new Error();
    return await controller.getFile(id);
  } catch (e) {
    return {
      error: true,
    };
  }
};

export default postResolver;
