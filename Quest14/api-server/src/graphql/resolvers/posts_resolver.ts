import { contextType } from '../../types/context';
import { resolverType } from '../../types/resolver';

const postsResolver = async (obj : any, args : any, { controller } : contextType): Promise<any> => {
  try {
    return await controller.getFileList();
  } catch (e) {
    return {
      error: true,
    };
  }
};

export default postsResolver;
