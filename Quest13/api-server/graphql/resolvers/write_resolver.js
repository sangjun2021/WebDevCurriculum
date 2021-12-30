const writeResolver = async (_, { id, payLoad, token }, { controller }) => {
  try {
    const { username } = controller.validateToken(token);
    if (!username) throw new Error("");
    await controller.setUser(username);
    await controller.writeFile(id, payLoad);
    return {
      error: false,
    };
  } catch (e) {
    return {
      error: true,
    };
  }
};

module.exports = writeResolver;
