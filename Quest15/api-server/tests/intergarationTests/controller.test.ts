import controller from '../../src/controllers';
import dbController from '../../src/controllers/db_controller';

const dummyPost = [
  { id: '1sd4', title: 'test title', text: 'test text' },
  { id: '45w6', title: 'test title', text: 'test text' },
  { id: '11dwefq', title: 'test title', text: 'test text' },
  { id: '3efdv4', title: 'test title', text: 'test text' },
  { id: '3123ff4', title: 'test title', text: 'test text' },
];
describe('controller test', () => {
  beforeAll(async () => {
    await dbController.init();
    await controller.setUser('user1');
  });
  test('create/get post test', async () => {
    for (const post of dummyPost) {
      await controller.writeFile(post.id, {
        title: post.title,
        text: post.text,
      });
      const newPost = await controller.getFile(post.id);
      expect(newPost).toEqual(post);
    }
  });
  test('get post list test', async () => {
    const postList = await controller.getFileList();
    expect(postList?.length).toBe(dummyPost.length);
  });
  test('delete post test', async () => {
    for (const post of dummyPost) {
      await controller.deleteFile(post.id);
    }
    const postList = await controller.getFileList();
    expect(postList?.length).toBe(0);
  });
});
