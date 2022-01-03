const deleteResolver = async (_, { id, token }, { controller }) => {
  try {
    const { username } = controller.validateToken(token);
    if (!username) throw new Error("");
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

module.exports = deleteResolver;
