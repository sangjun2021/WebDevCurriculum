const controller = require("../../controllers/index");

const postResolver = async (_, { id }) => {
  try {
    return await controller.getFile(id);
  } catch (e) {
    return {
      error: true,
    };
  }
};

module.exports = postResolver;
