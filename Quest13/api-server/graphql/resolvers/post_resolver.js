const postResolver = async (_, { id }, { controller }) => {
  try {
    return await controller.getFile(id);
  } catch (e) {
    return {
      error: true,
    };
  }
};

module.exports = postResolver;
