const controller = require("../../controllers/index");

const postsResolver = async () => {
  try {
    return await controller.getFileList();
  } catch (e) {
    return {
      error: true,
    };
  }
};

module.exports = postsResolver;
