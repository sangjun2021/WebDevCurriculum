const userResolver = async (_, { token }, { controller }) => {
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
