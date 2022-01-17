import hashController from '../../src/controllers/hash_controller';

test('hashController', async () => {
  const keyArray = [{ key: 'key1', salt: 'salt1' }, { key: 'key2', salt: 'salt2' }, { key: 'key3', salt: 'salt3' }, { key: 'key4', salt: 'salt4' }];
  keyArray.forEach(async (key) => {
    const hashKey = await hashController.createKey(key.key, key.salt);
    const validateKey = await hashController.validateKey(key.key, key.salt, hashKey.result);
    expect(validateKey).toBe(true);
  });
});
