const { v4: uuidv4 } = require("uuid");
const writeResolver = async (
  _,
  { id = uuidv4(), payLoad, token },
  { controller }
) => {
  try {
    const { username } = controller.validateToken(token);
    if (!username) throw new Error("");
    await controller.setUser(username);
    await controller.writeFile(id, payLoad);
    const post = await controller.getFile(id);
    return post;
  } catch (e) {
    return {
      error: true,
    };
  }
};

module.exports = writeResolver;
