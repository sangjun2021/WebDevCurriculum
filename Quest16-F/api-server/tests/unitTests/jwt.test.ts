import jwtController from '../../src/controllers/jwt_controller';

test('jwtController Test', () => {
  const testUsers = ['username1', 'username2', 'username3', 'username4'];
  testUsers.forEach((username) => {
    const token = jwtController.createToken(username);
    const result = jwtController.validateToken(token);
    expect(result).toBe(username);
  });
});
