const controller = require("../../controllers/index");
const authkey = controller.createToken("user1");
console.log(authkey);
const userResolver = async (_, { token }) => {
  try {
    const { username } = controller.validateToken(token);
    if (!username) throw new Error("");
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

module.exports = userResolver;
