const postsResolver = async (obj, args, { controller }) => {
  try {
    return await controller.getFileList();
  } catch (e) {
    return {
      error: true,
    };
  }
};

module.exports = postsResolver;
